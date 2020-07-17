export const CHUCK_NORRIS_API = "https://api.chucknorris.io/jokes/random";

export async function getJoke() {
  const response = await fetch(CHUCK_NORRIS_API);
  const data = await response.json();

  return data;
}
