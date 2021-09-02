const getPassword = async (pathChecked, passwordLength) => {
  const base = "https://fierce-anchorage-76525.herokuapp.com/passwordapi/v2/";
  const query = `${pathChecked}?passwordLength=${passwordLength}`;
  const url = `${base}${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

getPassword("special-characters", "9")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
