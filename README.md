# VisokiNapon

Aplikacija se implementira po uzoru na kviz Visoki napon. 
Visoki napon je prvi srpski licencirani kviz i emitovan je od 29.06.2006. do 24.06.2011. na televiziji RTS.  

Kviz se sastoji od 16 pitanja koja donose razlièite novèane vrednosti (pet pitanja od 10.000, 50.000 i 100.000 dinara), kao i od polja visokog napona. 
Ukoliko se igraè odluèi za ovo polje, ima opciju da udvostruèi osvojeni iznos ili da ga izgubi u potpunosti. 
Odgovaranje na pitanja sastoji se od èetiri runde ili faze. Pritom, igraè ima na raspolaganju tri vrste pomoæi - dve zamene pitanja i tender. 

U jednoj sesiji igre ukljuèena su najmanje èetiri igraèa, dok je broj sesija neogranièen. 
Dok jedan igraè iz sesije igra, drugi posmatraju i ukljuèuju se u sluèaju tendera. 
Sesija se završava kada svi igraèi završe igru. Pobednik sesije je igraè koji je osvojio najveæi iznos.

Pokretanje

Pozicionirati se u folder ClientApp i izvrsiti komandu
npm install

Pozicionirati se u glavni folder (na nivou gde je .csproj fajl) i izvrsiti komandu
dotnet restore

U fajlu appsettings.json azurirati ime servera i ime baze po potrebi
"Default": "server=DESKTOP-DSSAV0H\\RS2SERVER; database=VisokiNapon; Integrated Security = SSPI;"

Izvrsiti komandu
dotnet-ef database update

Izvrsiti komandu
dotnet run

U pretrazivacu otvoriti stranicu 
https://localhost:5001/
