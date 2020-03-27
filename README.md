# VisokiNapon

## IP adresa servera: [165.22.69.176](https://165.22.69.176)


Aplikacija se implementira po uzoru na kviz Visoki napon. 
Visoki napon je prvi srpski licencirani kviz i emitovan je od 29.06.2006. do 24.06.2011. na televiziji RTS.  

Kviz se sastoji od 16 pitanja koja donose različite novčane vrednosti (pet pitanja od 10.000, 50.000 i 100.000 dinara), kao i od polja visokog napona. 
Ukoliko se igrač odluči za ovo polje, ima opciju da udvostruči osvojeni iznos ili da ga izgubi u potpunosti. 
Odgovaranje na pitanja sastoji se od četiri runde ili faze. Pritom, igrač ima na raspolaganju tri vrste pomoći - dve zamene pitanja i tender. 

Postoje dve vrste igrača, oni koji igraju Visoki napon, i oni koji odgovaraju na tenderska pitanja koja postavljaju (prosleđuju) igrači koji igraju Visoki napon.
Cilj igrača koji igraju Visoki napon jeste da osvoje što veću sumu. Pored što veće osvojene sume, cilj onih koji odgovaraju na tenderska pitanja je da imaju što više prihvaćenih ponuda sa tačnim odgovorom. 


## Pokretanje:

1. Kreirati praznu bazu podataka (bez tabela) *VisokiNapon* u SQL Serveru

2. Pozicionirati se u folder *ClientApp* iz komandne linije i izvršiti komandu
<pre>npm install</pre>

3. Pozicionirati se u glavni folder (na nivou gde je *.csproj* fajl) i izvršiti komandu
<pre>dotnet restore</pre>

4. Napraviti [SendGrid](https://sendgrid.com/) Api Key da bi aplikacija slala mailove koristeći SendGrid. 
Otvoriti terminal kao administrator i izvršiti komandu
<pre>setx "SENDGRID_KEY" "SENDGRID_KEY_YOU_HAVE_CREATED"</pre>
Ukoliko preskočite ovaj korak, nećete dobijati kod u konfirmacionom mailu, a isti možete pratiti putem komandne linije.

5. Izvršiti komandu
<pre>dotnet run</pre>

6. U pretraživacu otvoriti stranicu 
<pre>https://localhost:5001/</pre>

