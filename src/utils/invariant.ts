export default function invariant(
  condition: unknown,
  message?: string,
): asserts condition {
  if (condition) {
    return;
  }

  let fullMessage = "Invariant Violation";
  if (!import.meta.env.PROD && message) {
    fullMessage += `: ${message}`;
  }

  throw new Error(fullMessage);
}
