import { Injectable } from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Injectable()
export class NotifyService {
    settings: any;
    isDesktop: boolean;

    constructor(private translationService: TranslationService) {
        PNotify.prototype.options.stack.firstpos1 = 100;
        this.settings = {
            styling: 'brighttheme',
            buttons: {
                sticker: false
            },
            animate: {
                animate: true,
                in_class: 'bounceInRight',
                out_class: 'bounceOutRight'
            }
        };
    }

    private pnotify(opts: PNotifyOptions, delay: number = 0, closeOnClick: boolean = true): PNotify {
        Object.assign(opts, this.settings);
        if (delay === 0) {
            opts.hide = false;
        } else {
            opts.hide = true;
            opts.delay = delay;
        }
        if (opts.type === 'error') {
            opts.buttons.closer_hover = false;
            // closeOnClick = false;
        }       

      opts.text = this.translationService.translate(<string>opts.text) || opts.text;
      opts.title = this.translationService.translate(<string>opts.title) || opts.title;

        const notice = new PNotify(opts);
        if (closeOnClick) {
            notice.get().click(function (e) {
                if (!$(e.target).hasClass('ui-pnotify-closer')) {
                    $('.ui-pnotify-closer', this).click();
                }
            });
        }
        return notice;
    }

    success(opts: PNotifyOptions, delay: number = 5000, closeOnClick: boolean = true): PNotify {
        opts.type = 'success';
        return this.pnotify(opts, delay, closeOnClick);
    }

    notice(opts: PNotifyOptions, delay: number = 5000, closeOnClick: boolean = true): PNotify {
        opts.type = 'notice';
        return this.pnotify(opts, delay, closeOnClick);
    }

    error(opts: PNotifyOptions, delay: number = 5000, closeOnClick: boolean = true): PNotify {
        opts.type = 'error';
        return this.pnotify(opts, delay, closeOnClick);
    }

    info(opts: PNotifyOptions, delay: number = 5000, closeOnClick: boolean = true): PNotify {
        opts.type = 'info';
        return this.pnotify(opts, delay, closeOnClick);
    }
}
