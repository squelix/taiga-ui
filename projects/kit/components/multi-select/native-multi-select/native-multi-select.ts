import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostBinding,
    Inject,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {AbstractTuiControl, TuiIdService, TuiMapper} from '@taiga-ui/cdk';
import {TUI_TEXTFIELD_HOST, TuiDataListDirective} from '@taiga-ui/core';

import {TuiMultiSelectDirective} from '../multi-select.directive';

@Directive()
export abstract class AbstractTuiNativeMultiSelect {
    @ViewChild(TuiDataListDirective, {read: TemplateRef, static: true})
    readonly datalist: TemplateRef<any> | null = null;

    constructor(
        @Inject(TUI_TEXTFIELD_HOST) readonly host: TuiMultiSelectDirective,
        @Inject(AbstractTuiControl) readonly control: AbstractTuiControl<unknown>,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLSelectElement>,
        @Inject(TuiIdService)
        private readonly idService: TuiIdService,
        @Inject(ChangeDetectorRef) readonly cdr: ChangeDetectorRef,
    ) {}

    @HostBinding(`id`)
    get id(): string {
        return this.elementRef.nativeElement.id || this.idService.generate();
    }

    selectedMapper: TuiMapper<string, boolean> = (option, value) =>
        value.includes(option);

    onValueChange(): void {
        const {selectedOptions} = this.elementRef.nativeElement;

        this.host.onSelectionChange(
            Array.from(selectedOptions).map(option => option.value),
        );
    }
}
