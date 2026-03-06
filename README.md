# Chris Relation'elle - Landing Page

Landing page professionnelle pour **Christine Moutoussamy**, therapeute conjugale et familiale basee en Guadeloupe (Sainte-Rose & Morne-a-l'Eau).

## Apercu

Site vitrine one-page concu pour presenter les services de therapie conjugale et familiale, et convertir les visiteurs en prises de contact (telephone, email, formulaire, Resalib).

## Structure du projet

```
therapeute/
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles (responsive, palette du site existant)
├── js/
│   └── main.js         # Navigation, validation formulaire, animations
├── img/                # Dossier pour les images (a completer)
├── _headers            # Headers de securite (Netlify/Cloudflare Pages)
├── netlify.toml        # Configuration Netlify
├── .gitignore
└── README.md
```

## Sections

1. **Navigation** - Sticky header avec smooth scroll, menu burger mobile
2. **Hero** - Presentation, titre, CTA principal, numero de telephone
3. **A propos** - Parcours, diplomes, approche therapeutique
4. **Accompagnement** - 4 types : individuel, couple, famille, coaching de vie
5. **CTA intermediaire** - Appel a l'action avec telephone et formulaire
6. **Temoignages** - 3 avis clients
7. **Consultations** - 4 lieux (Morne-a-l'Eau, Sainte-Rose, en ligne, domicile) + horaires
8. **Contact** - Formulaire valide + coordonnees directes + lien Resalib
9. **Footer** - Navigation rapide, contact
10. **Bouton flottant** - Appel telephonique rapide (mobile)

## Stack technique

- **HTML5** semantique avec accessibilite (ARIA, labels)
- **CSS3** avec custom properties, Grid, Flexbox, responsive design
- **JavaScript** vanilla (IIFE, pas de dependances)
- **Google Fonts** : Playfair Display (titres) + Inter (corps)

## Securite web

- Content Security Policy (CSP) via meta tags et headers serveur
- X-Frame-Options: DENY (protection clickjacking)
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera, microphone, geolocation desactives
- Strict-Transport-Security (HSTS)
- Validation des inputs cote client (regex, longueur, caracteres)
- Sanitisation XSS des valeurs du formulaire avant envoi
- Champ honeypot anti-spam
- Aucune donnee sensible dans le code source

## Palette de couleurs

| Couleur     | Hex       | Usage                  |
| ----------- | --------- | ---------------------- |
| Vert olive  | `#bbbe64` | CTA, accents           |
| Gris bleute | `#7d8491` | Texte secondaire       |
| Gris clair  | `#c0c5c1` | Bordures, separateurs  |
| Creme       | `#eaf0ce` | Fonds legers, badges   |
| Blanc       | `#ffffff` | Fond principal         |
| Prune fonce | `#443850` | Titres, header, footer |

## Deploiement

Le site est pret pour un deploiement statique :

- **Netlify** : configuration incluse (`netlify.toml` + `_headers`)
- **GitHub Pages** : servir `index.html` depuis la branche `main`
- **Tout hebergeur statique** : copier les fichiers tels quels

### Formulaire de contact

Le formulaire utilise [Formspree](https://formspree.io). Pour activer l'envoi :

1. Creer un compte sur formspree.io
2. Creer un formulaire et recuperer l'ID
3. Remplacer `xplaceholder` dans l'attribut `action` du formulaire dans `index.html`

## Lancement local

Ouvrir `index.html` dans un navigateur, ou servir avec :

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000

## Licence

Projet prive - Tous droits reserves Chris Relation'elle.
