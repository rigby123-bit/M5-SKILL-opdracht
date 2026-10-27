async function fetchPokemon(query) {
	const error = document.querySelector("#error");
	error.textContent = "";

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`);
	if (!response.ok) {
		error.textContent = `Pokémon "${query}" niet gevonden.`;
		return;
	}
	const data = await response.json();

	const name = document.querySelector("#name");
	name.textContent = data.name;

	const types = document.querySelector("#types");
	types.innerHTML = "";
	data.types.forEach((element) => {
		const type = document.createElement("span");
		type.textContent = element.type.name;
		type.classList.add("type", element.type.name);
		types.append(type);
	});

	const image = document.querySelector("#image");
	image.src = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
	image.alt = `Afbeelding van ${data.name}`;

	const stats = document.querySelectorAll(".stat");
	data.stats.forEach((element, index) => {
		const statName = element.stat.name.replaceAll("-", " ");
		stats[index].textContent = `${statName}: ${element.base_stat}`;
	});

	const moves = document.querySelector("#moves");
	moves.innerHTML = "";
	data.moves.forEach((element) => {
		const canLearnByLevelUp = element.version_group_details.some(
			(detail) => detail.move_learn_method.name === "level-up"
		);

		if (canLearnByLevelUp) {
			const moveItem = document.createElement("li");
			moveItem.textContent = element.move.name;
			moves.append(moveItem);
		}
	});
}

document.querySelector("#search-form").addEventListener("submit", (event) => {
	event.preventDefault();
	fetchPokemon(document.querySelector("#search-input").value);
});

fetchPokemon("34");
