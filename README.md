# AUTHOR : LAMINE AIT ISSAD
`m.lamine.ait.issad@gmail.com`

# DEMO : HACHICUPS CDKTF with TYPESCRIPT

This repository contains a demo of how to provision the hachicup education infrastructure using a simple CDKTF template and the filesystem as ressources. (Folders & files).

# prerequisite :

- NPM 9.5.0
- node 9.5.0
- Terraform: 1.4.4
- Docker : To run the terraform hachicups provider 20.10.24
- CDKTF: 20.10.24

# How To :

- Run `pnpm install` to install all the dependencies.
- Start the docker provider: `cd packages/iac/provider && docker compose up`
- Create the hachicup user in your container : `curl -X POST localhost:19090/signup -d '{"username":"education", "password":"test123"}'`
- Provision your infrastructure: In `packages/iac/orders` : Folders represent destinct orders, their content represents order's items and the file's content the quantity of each item.
- Run `cd packages/iac && cdktf deploy` to sync and deploy your infrastructure into the hachicup container.
- Run `cd packages/iac && cdktf destroy` to destroy and reset all the provisoned ressources.
- Other utils commands can be found in `packages/iac/help.ms`.

# To Do :
- Unit tests, mocks.
- Container to run the package. (With cdktf, terraform, node).

# @ YASSIR
Thank's for the intresting & fun challenge.
`platform@yassir.com`.

# Adding test commit from mac osX
