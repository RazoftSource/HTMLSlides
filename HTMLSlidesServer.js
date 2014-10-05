var http = require('http'),
	colors = require('colors'),
	fs = require('fs');
	config = require('./config.json');

//Store the arguments
var args;

//Print function
function print(string, skip_nl){
	if(!skip_nl){
		string += "\n";
	}

	process.stdout.write(string);
}

// Function to create a new project
function new_project(){
	if(args[3].length == 0){
		print("Structure:".red + "hs new project <name>".green);
	} else {
		var exists;
		fs.exists("./projects", function(e){
			exists = e;
		});

		if(e){
			print("Presentation named"+ args[3].yellow + "already exists, please pick a new name.");
		} else {
			if(fs.mkdirSync("./projects/"+args[3]) ){
				fs.writeSync("./projects/"+args[3]+"/config.json");
			}
		}
	}
}

// What to do on input
function handle(){

	// Switch based on the second argument
	switch(args[1]){

		// If the first argument is "new", see what the user wants to do
		case 'new':
			switch(args[2]){
				case 'presentation':
				case 'project':
					new_project();
					break;
			}
			break;

		// Quit the program on any of these cases
		case 'end':
		case 'exit':
		case 'quit':
			process.exit(1);
			break;

		case 'edit':

			break;

		case 'list':

			break;

		case 'switch':

			break;

		case 'slides':

			break;

		case 'present':

			break;

		// If no cases were met, show what the user could do
		default:
			print("Available options:\n\tnew\n\texit\n\tedit\n\tlist\n\tswitch\n\tslides\n\t"+"present".green);
			break;
}

// Process handling
process.title = "HTMLSlides";
process.stdin.setEncoding('utf8');

//Welcome message
print("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=".blue);
print("\tWelcome to HTMLSlides".green);
print("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=".blue);
print("\n");

//Read the input
process.stdin.on('readable', function(){

	// Add the thingy at the beginning xD
	print(">".yellow, 1);

	// Read the input
	var input = process.stdin.read();

	// If not empty, send the input to the handle function
	if(input != null){
		args = input.replace(/\n|\r/g, "").split(" ");
		handle();
		print(">".yellow, 1); // Another thingy
	}

});