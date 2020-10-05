# kata-native-test

Resolviendo un Kata de programación usando React Native.

**Author**: Daniel Navarrete

## Kata

Un brujo ha entrado a una tienda y ha comprado un cierto número de pociones para ir a matar
a una estrige, entre los tipos de poción compradas estan las siguentes:

- Poción roja.
- Poción azul.
- Poción verde.
- Poción amarilla.
- Poción gris.

Al mezclar diferentes tipos de pociones puedes lograr hacer más daño a tu objetivo, las
diferentes mezclas y porcentaje de daño que puedes hacer son las siguientes:

- Una poción causa un 3% de daño.
- Dos pociones distintas causan un 5% de daño.
- Tres pociónes distintas causan un 10% de daño.
- Cuatro pociónes distintas causan un 20% de daño.
- Cinco pociónes distintas causan un 25% de daño.

El reto consiste en realizar un algoritmo que ayude al brujo a calcular los ataques más óptimos
para una cantidad de pociones dadas, da igual el número de ataques y combinaciones que
haga mientras se cumpla que:

- Solo puedes combinar pociones de distinto color.
- El resultado debe ser las combinaciones que causen mayor daño.

### Caso 1:

El brujo ha comprado las siguentes pociones:

- 2 pociones rojas.
- 1 poción azul.
- 1 poción verde.

Sus mejores ataques serian los siguentes:

- Ataque 1: usar 3 pociones distintas causan un 10% de daño.
- Ataque 2: usar la ultima poción que le queda causa un 3% de daño.
- Total: el brujo a causado un 13% de daño.

### Caso 2:

El brujo ha comprado las siguentes pociones:

- 2 pociones rojas.
- 2 pociones azules.
- 1 poción verde.
- 1 poción amarilla.
- 1 poción gris.

Sus posibles ataques serían:

**Respuesta 1:**

- Ataque 1: usar 5 pociones distintas causan un 25% de daño.
- Ataque 2: usar 2 pociones distintas causan un 5% de daño.
- Total: el brujo ha causado un 30% de daño.

**Respuesta 2:**

- Ataque 1: usar 5 pociones distintas causan un 25% de daño.
- Ataque 2: usar 1 poción causan un 3% de daño.
- Ataque 3: usar 1 poción causa un 3% de daño.
- Total: el brujo ha causado un 31% de daño.

Por lo tanto la respuesta correcta en estas combinaciones es la 2da.

### Caso 3:

El brujo ha comprado las siguentes pociones:

- 2 pociones rojas.
- 2 pociones azules.
- 2 pociones verde.
- 1 poción amarilla.
- 1 poción gris.

Cuáles serían sus mejores ataques?

## Como ejecutar el código

- Ejecutar `yarn install` para instalar las dependencias.
- Correr `yarn start` para iniciar el servidor, el código QR que aparecerá en la terminal permitirá iniciar la aplicación desde IOS o Android usando Expo.
- `yarn test` ejecutará las pruebas. el test coverage puede verse corriendo `yarn coverage`.
