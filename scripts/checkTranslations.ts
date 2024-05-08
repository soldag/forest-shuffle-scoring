import colors from "colors";
import fs from "fs";
import { glob } from "glob";
import _ from "lodash";
import path from "path";
import { fileURLToPath } from "url";

interface Issue {
  code: string;
  description: string;
  level?: "error" | "warning";
}

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const translationsDir = path.resolve(rootDir, "src/translations");
const fileGlob = path.resolve(translationsDir, "*.json");
const defaultLocaleFilePath = path.resolve(translationsDir, "en.json");

const readMessages = (filename: string) =>
  fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, "utf-8")) : {};

const checkMessages = (
  defaultMessageIds: string[],
  messages: { [key: string]: string },
) => {
  const issues: Issue[] = [];
  const messageIds = Object.keys(messages);

  const missingIds = defaultMessageIds.filter((id) => !messageIds.includes(id));
  missingIds
    .sort()
    .forEach((id) => issues.push({ code: "missing-id", description: id }));

  const unusedIds = messageIds.filter((id) => !defaultMessageIds.includes(id));
  unusedIds
    .sort()
    .forEach((id) => issues.push({ code: "unused-id", description: id }));

  const emptyIds = Object.entries(messages)
    .filter(([, m]) => m.length === 0)
    .map(([k]) => k);
  emptyIds
    .sort()
    .forEach((id) =>
      issues.push({ code: "empty-message", description: id, level: "warning" }),
    );

  const isOrdered = _.isEqual(
    messageIds,
    defaultMessageIds.filter((id) => !missingIds.includes(id)),
  );
  if (!isOrdered) {
    issues.push({
      code: "wrong-order",
      description: "The messages are not ordered properly",
      level: "warning",
    });
  }

  return issues;
};

const fix = process.argv.includes("--fix");
const defaultMessageIds = Object.keys(readMessages(defaultLocaleFilePath));

const results = glob.sync(fileGlob).map((filePath) => {
  if (filePath === defaultLocaleFilePath) return true;

  let messages = readMessages(filePath);
  let issues = checkMessages(defaultMessageIds, messages);

  let numFixedIssues = 0;
  if (fix && issues.length > 0) {
    const newMessages = Object.fromEntries(
      defaultMessageIds.map((key) => [key, messages[key] || ""]),
    );
    fs.writeFileSync(filePath, JSON.stringify(newMessages, null, 2));

    const newIssues = checkMessages(defaultMessageIds, newMessages);
    numFixedIssues = issues.filter((i1) =>
      newIssues.every((i2) => !_.isEqual(i1, i2)),
    ).length;

    messages = newMessages;
    issues = newIssues;
  }

  if (issues.length > 0 || numFixedIssues > 0) {
    const relativeFilePath = path.relative(rootDir, filePath);
    console.error(relativeFilePath.underline);

    if (issues.length > 0) {
      const maxCodeLength = Math.max(...issues.map((x) => x.code.length));
      for (const issue of _.orderBy(issues, ["code"])) {
        const { code, description, level = "error" } = issue;
        const color = level === "error" ? colors.red : colors.yellow;
        console.log(`${color(code.padEnd(maxCodeLength))}  ${description}`);
      }
      console.log();
    }

    if (numFixedIssues > 0) {
      const message =
        numFixedIssues === 1
          ? `${numFixedIssues} issue has been fixed automatically.`
          : `${numFixedIssues} issues have been fixed automatically.`;
      console.log(message.green);
      console.log();
    }
  }

  return issues.length === 0;
});

process.exit(results.every((x) => x) ? 0 : 1);
