import { Injectable } from '@angular/core';

@Injectable()
export class GlobalFunctionService {

    regexEmail;
    regexUrl;

    constructor() {
        this.regexEmail = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!"
            + "#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)"
            + "+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        this.regexUrl = new RegExp('http(s?)');
    }

    isEmail(email) {
        return email.match(this.regexEmail);
    }

    // wird benoetigt um das whitespace aus dem Datum zu entfernen
    // um gewisses routing zu ermoeglichen
    prepareTs(ts) {
        const arr = ts.split(' ');
        return arr[0] + '_' + arr[1];
    }

    // entfernt die Uhrzeit des Timestamps
    cutTimestamp(ts) {
        const str = ts.split(' ')[0].split('-');
        return str[2] + '.' + str[1] + '.' + str[0];
    }

    // Timestamp vorbereitung mit uhrzeit
    cutTimestampFull(ts) {
        const s = ts.split('.')[0];
        const v = s.split(' ');
        const d = v[0].split('-');
        return (d[2] + '.' + d[1] + '.' + d[0] + ' ' + v[1]);
    }

    // reduziert ein String auf eine gewisse Laenge
    adjustUrl(url, amt) {
        if (url.length > amt) {
            return url.substring(0, amt) + '...';
        } else {
            return url;
        }
    }

    // schaut ob der String eine Url ist oder nicht
    validUrl(content) {
        if (content.match(this.regexUrl)) {
            return true;
        } else {
            return false;
        }
    }

}
