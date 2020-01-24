# VisokiNapon

Aplikacija se implementira po uzoru na kviz Visoki napon. 
Visoki napon je prvi srpski licencirani kviz i emitovan je od 29.06.2006. do 24.06.2011. na televiziji RTS.  

Kviz se sastoji od 16 pitanja koja donose različite novčane vrednosti (pet pitanja od 10.000, 50.000 i 100.000 dinara), kao i od polja visokog napona. 
Ukoliko se igrač odluči za ovo polje, ima opciju da udvostruči osvojeni iznos ili da ga izgubi u potpunosti. 
Odgovaranje na pitanja sastoji se od četiri runde ili faze. Pritom, igrač ima na raspolaganju tri vrste pomoći - dve zamene pitanja i tender. 

Postoje dve vrste igrača, oni koji igraju Visoki napon, i oni koji odgovaraju na tenderska pitanja koja postavljaju (prosleđuju) igrači koji igraju Visoki napon.
Cilj igrača koji igraju Visoki napon jeste da osvoje što veću sumu. Pored što veće osvojene sume, cilj onih koji odgovaraju na tenderska pitanja je da imaju što više prihvaćenih ponuda sa tačnim odgovorom. 


## Pokretanje:

1. Pozicionirati se u folder *ClientApp* iz komandne linije i izvršiti komande
<pre>npm install</pre>
<pre>npm install ngx-countdown</pre>
<pre>npm install @angular/youtube-player</pre>

2. Pozicionirati se u glavni folder (na nivou gde je *.csproj* fajl) i izvršiti komandu
<pre>dotnet restore</pre>

3. U fajlu *appsettings.json* ažurirati ime servera i ime baze po potrebi
<pre>"Default": "server=DESKTOP-DSSAV0H\\RS2SERVER; database=VisokiNapon; Integrated Security = SSPI;"</pre>

4. Izvršiti komandu
<pre>dotnet-ef database update</pre>

5. Izvršiti komandu
<pre>dotnet run</pre>

6. U pretraživacu otvoriti stranicu 
<pre>https://localhost:5001/</pre>
