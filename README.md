# E.V.E Bot

![E.V.E](https://ih1.redbubble.net/image.646644893.4779/st,small,507x507-pad,600x600,f8f8f8.u1.jpg)

E.V.E is a voice enabled all in one discord bot.  Feel free to host your own instance!

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Configurations](#configurations)
- [Troubleshooting](#troubleshooting)
- [Support](#support)
- [License](#license)

## Features

- Play music!
- Clip or recite users!
- Say anything you want with the bot!

## Usage

1. Add the bot to your Discord Server! 
2. Use the `?help` command to all the various commands!
    - Use the `?help` command with a command name to see the command details! (e.g `?help play`)
3. Say a registered hotword to start a voice command!
    - The bot will cut you off after a few seconds, so be ready to say your command!

## Installation

### Environment Variables

| Name                                                                       | Environment Variable | Description                                                                                    | Required |
|----------------------------------------------------------------------------|----------------------|------------------------------------------------------------------------------------------------|----------|
| Bot Environment                                                            | bot_environment      | Informs the bot to use either 'development' or 'production' settings. Defaults to development. | ✗        |
| [Youtube Cookie](https://github.com/fent/node-ytdl-core/issues/635)        | youtube_cookie       | Required for the bot to bypass Youtube 429 Errors (Too many requests).                         | ✗        |

### General API Tokens

| Name                                                                       | Environment Variable | Description                                                                                    | Required |
|----------------------------------------------------------------------------|----------------------|------------------------------------------------------------------------------------------------|----------|
| [Discord Bot Token](https://discord.com/developers/applications)           | discord_token        | Required for the bot to login and communicate to discord.                                      | ✓        |
| [Youtube Search API Token](https://developers.google.com/youtube/v3)       | youtube_api_token    | Required for the bot to search for song URLs  (Hopefully this will be converted to a scraper). | ✓        |
| [Genius API Token](https://docs.genius.com/)                               | genius_token         | Required for the bot to find lyrics of songs.                                                  | ✗        |
| [Spotify API Tokens](https://developer.spotify.com/documentation/web-api/) | spotify_id           | Required for the bot to create radio playlists                                                 | ✗        |
|                                                                            | spotify_secret       |                                                                                                | ✗        |

### Platform API Tokens

Details on how to authenticate and configure each provider can be found in each of their individual sections.

#### Summary

| Name                                        | Speech-to-Text                                                                     | Text-to-Speech                                                                     | Storage                                                    |
|---------------------------------------------|------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|------------------------------------------------------------|
| [IBM Watson](#IBM Watson)                   | [✓](https://www.ibm.com/cloud/watson-speech-to-text)                               | [✓](https://www.ibm.com/cloud/watson-text-to-speech)                               | ✗                                                          |
| [Microsoft Azure](#Microsoft Azure)         | [✓](https://azure.microsoft.com/en-us/services/cognitive-services/speech-to-text/) | [✓](https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/) | ✗                                                          |
| [Google Cloud](#Google Cloud)               | [✓](https://cloud.google.com/speech-to-text)                                       | [✓](https://cloud.google.com/text-to-speech)                                       | ✗                                                          |
| [Amazon Web Services](#Amazon Web Services) | ✗                                                                                  | ✗                                                                                  | [✓](https://aws.amazon.com/dynamodb/?nc2=h_ql_prod_db_ddb) |

#### IBM Watson

| Environment Variable | Description |
|----------------------|-------------|
| watson_token         | API Key     |
| watson_url           | URL         |

#### Microsoft Azure

| Environment Variable | Description           |
|----------------------|-----------------------|
| microsoft_token      | KEY                   |
| microsoft_location   | LOCATION (e.g eastus) |

#### Google Cloud

| Environment Variable | Description                                        |
|----------------------|----------------------------------------------------|
| google_keyFileCred   | Contents of the Google Cloud JSON Credentials File |

#### Amazon Web Services

| Environment Variable  | Description       |
|-----------------------|-------------------|
| AWS_ACCESS_KEY_ID     | Access Key ID     |
| AWS_SECRET_ACCESS_KEY | Secret Access Key |

## Configurations

## Troubleshooting

- If the bot seems to be unresponsive or listening to any hotwords
    - Try using the `rejoin` command
    
- If the bot is unable to find any songs to play
    - Try adding / updating the [`youtube_cookie`](#environment-variables) to the bot

## Support

## License

This repository is licensed under Apache 2.0.  You may host an instance of this bot for non-commercial and personal use free of charge.
