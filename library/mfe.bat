rm -rf "C:\Users\Jack\AppData\Roaming\verdaccio\storage\mfe"
pushd mfe & npm run build & npm publish & popd