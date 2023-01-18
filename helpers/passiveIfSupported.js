/* Feature detection */
let passiveIfSupported = false;

try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get() {
        passiveIfSupported = { passive: true };
      }
    })
  );
} catch (err) {}

export default passiveIfSupported;
