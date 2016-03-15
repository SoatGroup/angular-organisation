# Comment bien organiser son projet Angular

## Les outils

Afin de pouvoir utiliser le projet, il va vous falloir quelques outils :

1. node + npm : vous pourrez les télécherger ici => https://nodejs.org/
2. bower : une fois npm installé vous pourrez installer bower avec une simple commande `npm install -g bower`
2. gulp : pareil que pour bower une simple commande suffit `npm install -g gulp`

## Installation

Une fois que vous avez tous les outils nécessaires, ouvrez une invite de commande et rdv à la racine du projet.

1. Nodes modules : nous avons besoin des modules contenus dans le fichier package.json tapez `npm install`
2. Pour faire fonctionner le projet il nous faut aussi les dépendances (comme Angular par exemple) tapez `bower install`

## Builder

Voilà nous sommes prets à lancer notre build :

1. local : tapez `gulp` pour lancer une build locale et lancer un serveur web puis un watch. Une nouvelle fenêtre va s'ouvrir avec notre projet lancé
2. dev : tapez `gulp dev` pour lancer une build en developement (si vous avez un serveur de dev)
3. prod : tapez `gulp prod` pour lancer une build en production