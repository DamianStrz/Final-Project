import React, { Component } from "react";

import { NavLink } from "react-router-dom";


class Policies extends Component {

    render(){
        return(
            <div>
                <CookiesPolicy/>
                <PrivacyPolicy/>
            </div>
        )
    }
}


class CookiesPolicy extends Component {

    render() {
        return(
            <ul>
                <h2>Polityka plików cookies</h2>
                <li>Strona internetowa korzysta z tzw. cookies (ciasteczka). Są to niewielkie pliki tekstowe wysyłane przez serwer www i przechowywane przez oprogramowanie komputera przeglądarki. Kiedy przeglądarka ponownie połączy się ze stroną, witryna rozpoznaje rodzaj urządzenia, z którego łączy się użytkownik. Parametry pozwalają na odczytanie informacji w nich zawartych jedynie serwerowi, który je utworzył. Cookies ułatwiają korzystanie z wcześniej odwiedzonych witryn.</li>
                <li>Gromadzone informacje mogą dotyczyć adresu IP, typu wykorzystywanej przeglądarki, języka, rodzaju systemu operacyjnego, dostawcy usług internetowych, informacji o czasie i dacie, lokalizacji oraz informacji przesyłanych do witryny za pośrednictwem formularza.</li>
                <li>Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym użytkownika. Większość znanych przeglądarek internetowych udostępnia możliwość ograniczenia wykorzystywania, zablokowanie wykorzystywania lub usunięcie plików cookies. Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej.</li>
                <li>Serwis stosuje dwa zasadnicze rodzaje plików (cookies) – sesyjne i stałe. Pliki sesyjne są tymczasowe, przechowuje się je do momentu opuszczenia strony serwisu (poprzez wejście na inną stronę, wylogowanie lub wyłączenie przeglądarki). Pliki stałe przechowywane są w urządzeniu końcowym użytkownika do czasu ich usunięcia przez użytkownika lub przez czas wynikający z ich ustawień.</li>
                <li>Zebrane dane służą do monitorowania i sprawdzenia, w jaki sposób użytkownicy korzystają z witryny, aby usprawniać funkcjonowanie serwisu zapewniając bardziej efektywną i bezproblemową nawigację.</li>
                <li>Użytkownik w każdej chwili ma możliwość wyłączenia lub przywrócenia opcji gromadzenia cookies poprzez zmianę ustawień w przeglądarce internetowej.</li>
            </ul>
        )
    }
}

class PrivacyPolicy extends Component {

    render() {
        return(
            <div>
                <h2>Polityka prywatności</h2>
                <h3>Klauzula informacyjna w związku z korzystaniem z aplikacji PrioritseME</h3>
                <ul>
                    <li>Administratorem Danych Osobowych jest twórca aplikacji PrioritiseME</li>
                    <li>Dane pozyskiwane i przetwarzane są wyłącznie w celu przedstawienia funkcjonalności aplikacji dla danego użytkownika, w szczególności w celu założenia konta, możliwości zmiany i resetowania hasła. Aplikacja jest projektem edukacyjnym i zawiera informację zalecającą nieprzekazywanie danych wrażliwych dla użytkownika w trakcie korzystania z niej.</li>
                    <li>Podstawą prawną przetwarzania danych jest art. 6 Ust 1 lit. a.</li>
                    <li>Dane przetwarzane mogą być udostępnione podmiotowi wspierającemu proces realizacji funkcjonalności aplikacji z wykorzystaniem platformy Firebase.</li>
                    <li>Okres przechowywania danych osobowych określa się na 1 rok.</li>
                    <li>Każdy użytkownik ma prawo do dostępu do swoich danych osobowych, do ich sprostowania, oraz żądania usunięcia (chyba, że inne przepisy prawa ograniczają te uprawnienia).</li>
                    <li>Dane nie są poddawane procesowi zautomatyzowanego podejmowania przetwarzania czyli tzw. profilowaniu.</li>
                    <li>Skargi należy kierować do Prezesa Urzędu Ochrony Danych Osobowych.</li>
                </ul>

                <h3>W sprawach dotyczących danych osobowych informujemy, że można się z nami skontaktować w następujący sposób:</h3>
                <ul>
                    <li>damians.praca@gmail.com</li>
                </ul>
            </div>
        )
    }
}

export default Policies;





