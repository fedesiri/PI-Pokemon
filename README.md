<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Pokemon

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>
<br />

<hr />
<br />

## Description

This is the individual project I developed during my time in Henry. The technologies I used are React, Redux, Express,  and a PostgresSQL database (PERN Stack). The API I used to obtain the data was also developed by me. With the Single Page Application you will be able to search for different pokemons, filter and order the pokemons that are being shown, and also create your own pokemon.


<hr />

## Installation
* Clone or fork the repository
* Install dependencies using npm install or yarn install (depending on your preference)
* Run the project using npm start or yarn start (depending on your preference)


<hr />

## Configuring the database

Create an .env file in the /api folder with the following parameters:


>DB_USER= postgresUser <br />
>DB_PASSWORD= postgresPassword <br />
>DB_HOST=localhost <br />

Replace <i>postgresUser</i> and <i>postgresPassword</i> with your database credentials to connect to PostgreSQL.

It must be necessary to create the pokemons database in ProgreSQL.

Once done, you can now perform npm install in the API folder, so that all the necessary dependencies are installed.

To bring the server online, run npm start.

<hr />

## Configuring the Frontend

For the front, no additional configurations are required. Run npm install in the Client folder and then npm start to launch the application.

<hr />

## Presentation and functionalities

### Home

<p align="center">
  <img height="500" src="./homePokemonReadme.png" />
</p>

The main view contains a navbar with its searchfield to search for pokemons by their names. In this component you can also find twelve cards that contains a different pokemon. You will have several pages with lots of pokemons in each one of them. At the bottom of the navbar, yo have some selects that are used to filter the pokemons by their properties.

Pokemon Detail
In this view you will be able to see all the pokemon's details and the types that belongs to it.

Create pokemon
This is a form where you can create your own pokemon as you like. It is a controlled form, and its fields are validated with javascript. Each text input is validated in order to check if it is not empty and if the value that the user enter is correct. If everything was ok, it shows a success message to tell the user that the pokemon has been created.


