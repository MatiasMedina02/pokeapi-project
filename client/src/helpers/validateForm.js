const regexNum = /[0-9]/;

export const validation = (pokemonData) => {
	const errors = {};
	if(pokemonData.name.length > 15){
		errors.name = "The pokemon's name cannot be longer than 15 characters.";
	}
	if(regexNum.test(pokemonData.name)){
		errors.name = "The pokemon's name cannot contain numbers"
	}
	if(!pokemonData.image){
		errors.image = "You must select an image.";
	}
	if(!pokemonData.types.length){
		errors.types = "You must select 2 or 3 types."
	}
	return errors;
};

export const validateTypes = (types) => {
	if(!types.length || types.length === 1 || types.length > 3){
		return "You must select 2 or 3 types.";
	}
	return "";
}