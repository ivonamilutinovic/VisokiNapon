# VisokiNapon

Aplikacija se implementira po uzoru na kviz Visoki napon. 
Visoki napon je prvi srpski licencirani kviz i emitovan je od 29.06.2006. do 24.06.2011. na televiziji RTS.  

Kviz se sastoji od 16 pitanja koja donose razli�ite nov�ane vrednosti (pet pitanja od 10.000, 50.000 i 100.000 dinara), kao i od polja visokog napona. 
Ukoliko se igra� odlu�i za ovo polje, ima opciju da udvostru�i osvojeni iznos ili da ga izgubi u potpunosti. 
Odgovaranje na pitanja sastoji se od �etiri runde ili faze. Pritom, igra� ima na raspolaganju tri vrste pomo�i - dve zamene pitanja i tender. 

U jednoj sesiji igre uklju�ena su najmanje �etiri igra�a, dok je broj sesija neograni�en. 
Dok jedan igra� iz sesije igra, drugi posmatraju i uklju�uju se u slu�aju tendera. 
Sesija se zavr�ava kada svi igra�i zavr�e igru. Pobednik sesije je igra� koji je osvojio najve�i iznos.

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
