async function fetchData() {
    try {
        const pokemonInput = document.getElementById("pokemonInput").value.trim().toLowerCase();
        const pokemonImage = document.getElementById("pokemonImage");

        if (!pokemonInput) {
            alert("Please enter a Pokémon name.");
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);

        if (!response.ok) {
            throw new Error("Invalid Pokémon name. Please try again.");
        }

        const data = await response.json();
        const pokemonSprites = data.sprites.front_default;

        if (!pokemonSprites) {
            throw new Error("No sprite available for this Pokémon.");
        }

        pokemonImage.src = pokemonSprites;
        pokemonImage.style.display = "block";
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}
