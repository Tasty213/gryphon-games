class CoursleError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CoursleError';
    Board.setStatutsMessage(message);
  }
}
