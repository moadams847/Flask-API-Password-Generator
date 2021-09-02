class GeneratePassword {
  constructor() {
    this.base = "https://fierce-anchorage-76525.herokuapp.com/passwordapi/v2/";
  }
  async getPassword(pathChecked, passwordLength) {
    const query = `${pathChecked}?passwordLength=${passwordLength}`;
    const url = `${this.base}${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
