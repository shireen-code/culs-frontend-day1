// Loads the herbs from data/herbs.json and shows each one as a card.

const list = document.querySelector("#herbs-list")
const count = document.querySelector(".count")
const search = document.querySelector("#herb-search")
let herbs = []

async function loadHerbs() {
  const response = await fetch("data/herbs.json")
  if (!response.ok) {
    throw new Error(`Could not load ${response.url}: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

function element(tag, className, text) {
  const node = document.createElement(tag)
  node.className = className
  node.textContent = text
  return node
}

function card(herb) {
  const item = element("li", "card", "")
  item.append(
    element("h3", "name", herb.name),
    element("p", "latin", herb.latin),
    element("p", "use", herb.use),
    element("p", "life", herb.life))
  return item
}

async function show() {
  herbs = await loadHerbs()
  renderHerbs()
}

function renderHerbs() {
  const query = search.value.trim().toLowerCase()
  const matches = herbs.filter(herb =>
    [herb.name, herb.latin, herb.use, herb.life]
      .some(value => value.toLowerCase().includes(query)))

  list.replaceChildren(...matches.map(card))

  if (!query) {
    count.textContent = `${herbs.length} herbs grow here.`
  } else if (matches.length === 0) {
    count.textContent = `No herbs match "${query}".`
  } else {
    count.textContent = `${matches.length} of ${herbs.length} herbs match "${query}".`
  }
}

search.addEventListener("input", renderHerbs)

show()
