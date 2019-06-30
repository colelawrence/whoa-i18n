echo 'Preparing'
npx ts-node ./src/bin.ts ts > ./test/whoa-ts.ts
npx ts-node ./src/bin.ts js > ./test/whoa-js.js
npx ts-node ./src/bin.ts types > ./test/whoa-js.d.ts

echo 'Testing: TypeScript'
npx ts-node ./test/ts-consumer.ts

echo 'Testing: JavaScript + Types'
npx ts-node ./test/js-consumer.ts
