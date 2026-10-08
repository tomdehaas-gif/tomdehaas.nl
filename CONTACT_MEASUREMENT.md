# Contactmeting

De bestaande Simple Analytics-installatie ontvangt vijf aanvullende events:

| Event | Moment | Betekenis |
| --- | --- | --- |
| `contact_click` | Klik op een interne link naar het contactgedeelte | Contactintentie. Meerdere klikken kunnen meerdere events geven. |
| `contact_form_start` | Eerste invoer in naam, e-mailadres of bericht | Maximaal één start per paginalading. |
| `contact_form_submit` | Geldig formulier wordt ter verzending aangeboden | Verzendpoging. Een nieuwe poging na een fout telt opnieuw. |
| `contact_form_success` | Formspree geeft een succesvolle HTTP-respons | Geaccepteerde inzending. Geen bewijs van ontvangst in de inbox of een gekwalificeerde aanvraag. |
| `contact_form_error` | Formspree geeft een fout of de netwerkverzending mislukt | Mislukte poging. Een netwerkfout kan ook betekenen dat het antwoord verloren ging nadat de server het bericht accepteerde. |

Events bevatten alleen vaste labels: `page`, `project_context` en bij contactklikken `placement` (`navigation` of `page`). Er worden geen formulierwaarden, contactgegevens of vrije teksten aan Simple Analytics doorgegeven.

`project_context` is het huidige project, of op de homepage het project uit de directe interne verwijzer. Zonder herkenbare verwijzer is dit `home`. Dit is context van de direct voorafgaande pagina, geen volledige bezoekersroute of bewezen onderwerp van de aanvraag. Er worden geen bezoekers-ID's of opslag over meerdere pagina's toegevoegd.

## Gebruik in Simple Analytics

Gebruik `contact_form_success` als primair doel en `contact_form_start` en `contact_click` als signalen van belangstelling. Gebruik `contact_form_submit` en `contact_form_error` om verzendproblemen te onderzoeken. Vergelijk aantallen over dezelfde periode. Tel de vijf events niet bij elkaar op als aanvragen. De teller meet acties, geen unieke mensen. Blokkering van analytics kan tot ondertelling leiden.

De bestaande formulierverzending blijft via Formspree lopen. Ook als analytics faalt, blijft het formulier bruikbaar. Dubbele verzending terwijl een verzoek loopt of nadat het is gelukt, wordt geblokkeerd. Na een fout kan iemand opnieuw proberen.

## Controle voor ingebruikname

De geïsoleerde controles gebruiken gesimuleerde serverreacties en sturen niets naar Formspree of Simple Analytics. Succes, serverfouten, netwerkfouten, opnieuw proberen, dubbele verzending, contactklikken, privacy en een nog niet geladen of defecte analyticsfunctie zijn gecontroleerd.

Na publicatie moeten de events nog zichtbaar worden gecontroleerd in het eigen Simple Analytics-account. Een echte testinzending kan daarnaast bevestigen dat Formspree het bericht verwerkt en dat de e-mail aankomt. Deze twee controles zijn nog niet uitgevoerd.

Documentatie: https://docs.simpleanalytics.com/events en https://docs.simpleanalytics.com/metadata
