import 'shared/components/font-awesome.js';
import { api } from '@converse/headless/core';
import { html } from 'lit';

export default () => {
    let extra_classes = api.settings.get('singleton') ? 'converse-singleton' : '';
    extra_classes += `converse-${api.settings.get('view_mode')}`;
    return html`
        <converse-chats class="converse-chatboxes no-gutters ${extra_classes}"></converse-chats>
        <div id="converse-modals" class="modals"></div>
        <converse-fontawesome></converse-fontawesome>
    `;
};
