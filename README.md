# Graphy Backend Coding Challenge

## Prerequisites

1. Make sure you have these installed on your machine:
	- [Docker]()


## Getting Started 

Ensure you have the Prerequisites installed, then run `yarn start`. This will create a Docker Compose stack.

Open `http://localhost:8000/ascii` in your browser to make an example request.

## Development

This project uses the following Docker images:
	
	- Node (includes NPM/Yarn)
	- Redis
	- Portainer (used to manage running Docker containers/images/stacks, dev-only)

## Running the project

Ensure the Docker Compose stack is already running (see Getting Started), then run `yarn query` with the appropriate parameters to generate a graph in your CLI 🌈🦄🎉

```bash
$ yarn query

Usage: cli [options]

Options:
  --symbol <symbol>  company stocks symbol
  --since <since>    starting date
  --until <until>    ending date
  --price <price>    price type (`open`, `high`, `low` or `close`) (default: "close")
  -h, --help         output usage information
```

## TODO
	- Integration tests
	- Multiple graph backends
	- Validation (use [Yup](https://github.com/jquense/yup))