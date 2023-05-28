import swaggerAutogen from 'swagger-autogen'


const doc = {
  info: {
    version: "1.0.0",
    title: "Giphi API",
    description: "Giphi documentation automatically generated by the <b>swagger-autogen</b> module."
  },
  host: "giphiapi.arcprojects.es",
  basePath: "/",
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "User",
      "description": "Endpoints"
    },
    {
      "name": "Gif",
      "description": "Endpoints"
    }
  ],
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header"
    },
    petstore_auth: {
      type: "oauth2",
      authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
      flow: "implicit",
      scopes: {
        read_pets: "read your gifs",
        write_pets: "modify gifs in your account"
      }
    }
  },
  definitions: {
    
    User: {
      userName: "simon_joe",
      email: "simon_joe@mail.com",
      password: "$2a$12$01M7akbhvXosETsZaBWO6ugQ2XilHeVu7T/.EAqwWRYVbD9oKxc5q"
    },
    Gif: {
      title: "First History Meme",
      gif: "https://www.iebschool.com/blog/wp-content/uploads/2015/03/hacer-venta.gif",
      type: "image/gif",
      userId: null
    }
  }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/endpoints.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index')           // Your project's root file
})