import {
    LightningElement,
    track,
    api,
    wire
} from 'lwc';
import {
    getRecord
} from 'lightning/uiRecordApi';

import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

import {
    NavigationMixin
} from 'lightning/navigation';

const FIELDS = [
    'Account.Name',
    'Account.Rating',
    'Account.Phone',
    'Account.Type'
];

export default class AccountComponent extends NavigationMixin(LightningElement) {
    @api recordId;
    @track account;
    name;
    rating;
    phone;
    accType;


    @wire(getRecord, {
        recordId: '$recordId',
        fields: FIELDS
    })
    wiredRecord({
        error,
        data
    }) {
        if (data) {
            console.log('this... account ' + JSON.stringify(data));
            this.acccount = data;
            this.name = this.acccount.fields.Name.value;
            this.phone = this.acccount.fields.Phone.value;
            this.rating = this.acccount.fields.Rating.value;
            console.log('----' + JSON.stringify(data.fields.Type));
            this.accType = data.fields.Type.value;
            console.log('this... account ' + JSON.stringify(this.account));
        } else if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading contact',
                    message,
                    variant: 'error',
                }),
            );
        } 
    }
}