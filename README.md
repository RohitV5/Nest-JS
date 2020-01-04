# Nest_Typescript

# Create a new nest JS PRroject -> Nest New

# Remove app controller and service and app.spec files.

# Run -> npm run start:dev

# Make an new module ->nest g module task


# Controller decorated as @Controller('task') -> will handle endpoint with /task, contains handler decorated with @get, @post etc which handles endpoints. 

# Make a new controller named tasks and the CLI will look for a module folder name tasks and import it in that , if not found they it will add in app module
# nest g controller tasks --no-spec

# Nest saves us from writing boilerplate code.

# Next we create a service using cli
# nest g service tasks --no-spec
# --no-spec is used so that it doesnt create a test file.


# We created a service , injected it in a controller , then we hit the endpoint from postman

