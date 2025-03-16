async function fetchData() {
    try {
        const input = document.getElementById("pokemonInput").value.trim().toLowerCase();
        const pokemonName = document.getElementById("pokemonName");
        const pokemonImage = document.getElementById("pokemonImage");
        const pokemonTypes = document.getElementById("pokemonTypes");
        const pokemonHeight = document.getElementById("pokemonHeight");
        const pokemonWeight = document.getElementById("pokemonWeight");
        const pokemonAbilities = document.getElementById("pokemonAbilities");
        const pokemonStats = document.getElementById("pokemonStats");
        const pokemonCry = document.getElementById("pokemonCry");
        const message = document.getElementById("message");
        const pokemonSection = document.getElementById("pokemonSection");

        if (!input) {
            message.textContent = "Please enter a Pokémon name or ID!";
            pokemonSection.classList.add("hidden");
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

        if (!response.ok) {
            throw new Error("Pokémon not found! Please check the spelling or try another one.");
        }

        const data = await response.json();
        
        // Update Pokémon Details
        pokemonName.textContent = data.name.toUpperCase();
        pokemonImage.src = data.sprites.front_default;
        pokemonTypes.textContent = `Type(s): ${data.types.map(type => type.type.name).join(", ")}`;
        pokemonHeight.textContent = (data.height / 10).toFixed(1);
        pokemonWeight.textContent = (data.weight / 10).toFixed(1);
        pokemonAbilities.textContent = data.abilities.map(ability => ability.ability.name).join(", ");
        
        // Show base stats
        pokemonStats.innerHTML = "";
        data.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        });

        // Play Pokémon cry
        pokemonCry.src = data.cries.latest;
        pokemonCry.classList.remove("hidden");
        pokemonCry.play();

        // Display Pokémon section
        pokemonSection.classList.remove("hidden");
        message.textContent = "";
        
    } catch (error) {
        console.error(error.message);
        document.getElementById("message").textContent = error.message;
    }
}
