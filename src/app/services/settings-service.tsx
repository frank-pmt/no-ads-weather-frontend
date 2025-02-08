
// TODO: read and write to local storage

export const settingsService = {

  async getUserLocale(): Promise<string> {
    return Promise.resolve('en-US');
  },

  async getUnitsPreference(): Promise<string> {
    return Promise.resolve('celsius');
  }
}