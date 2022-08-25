call %~dp0\init.bat

mkdir docker-data\api

copy api\openapi.yaml docker-data\api\

rmdir /s /q docker-data\api\generated

docker-compose -p %DOCKER_PROJECT% --env-file %ENV_FILE% -f docker-compose.yml run --rm api generate -i openapi.yaml -g typescript-fetch --additional-properties=typescriptThreePlus=true -o /var/app/docker-data/api/generated

rmdir /s /q docker-data\api\generated\.openapi-generator
del docker-data\api\generated\.openapi-generator-ignore

xcopy /s /y docker-data\api\generated front\src\api\

xcopy /s /y docker-data\api\generated\runtime.ts server\src\api\
xcopy /s /y docker-data\api\generated\models server\src\api\models\

pause
