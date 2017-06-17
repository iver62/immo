import { ValidatorFn, AsyncValidatorFn, Validators as V, FormControl } from '@angular/forms';

// the need in this validators is the non-trimming angular standard behavior
// see https://github.com/angular/angular/issues/8503
export class Validators {

	public static required(control: FormControl) {
		if (!control.value || typeof control.value === 'string' && !control.value.trim()) {
			return {
				required: true
			};
		}
		return null;
	}

	public static minLength(length: number): ValidatorFn {
		return (control: FormControl) => {
			if (!control.value || typeof control.value === 'string' && control.value.trim().length < length) {
				return {
					minlength: true
				};
			}
			return null;
		};
	}

	public static maxLength(length: number): ValidatorFn {
		return (control: FormControl) => {
			if (control.value && typeof control.value === 'string' && control.value.trim().length > length) {
				return {
					maxlength: true
				};
			}
			return null;
		};
	}

	public static pattern(pattern: string): ValidatorFn {
		return V.pattern(pattern);
	}

	public static minAmount(amount: number): ValidatorFn {
		return (control: FormControl) => {
			if (control.value && control.value.length < amount) {
				return {
					minamount: true
				};
			}
			return null;
		};
	}

	public static maxAmount(amount: number): ValidatorFn {
		return (control: FormControl) => {
			if (control.value && control.value.length > amount) {
				return {
					maxamount: true
				};
			}
			return null;
		};
	}

	public static compose(validators: ValidatorFn[]): ValidatorFn {
		return V.compose(validators);
	}

	public static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn {
		return V.composeAsync(validators);
	}

	public static isValidMailFormat(control: FormControl) {
		const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
		if (control.value !== "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
			return { "Please provide a valid email": true };
		}
		return null;
	}

};