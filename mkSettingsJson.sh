#!/usr/bin/env bash
#
declare SCRIPT=$(readlink -f "$0");
declare SCRIPTNAME=$(basename "$SCRIPT"); # This script's name

[ -z $1 ] && echo -e "Usage:   ./${SCRIPTNAME} <database server host name>" && exit 1;

export GOOGLE_CLIENT_ID=$(jq -r .virtual_hosts[\"yoursite.yourpublic.work\"].accounts.GOOGLE_CLIENT_ID ~/.vulcan/index.json);
export TWITTER_CONSUMER_KEY=$(jq -r .virtual_hosts[\"yoursite.yourpublic.work\"].accounts.TWITTER_CONSUMER_KEY ~/.vulcan/index.json);
export GOOGLE_CLIENT_SECRET=$(jq -r .GOOGLE_CLIENT_SECRET ~/.ssh/deploy_vault/yoursite.yourpublic.work/secrets.json);
export TWITTER_SECRET=$(jq -r .TWITTER_SECRET ~/.ssh/deploy_vault/yoursite.yourpublic.work/secrets.json);

sh .scripts/target/host_scripts/settings.json.template.sh > settings.json
