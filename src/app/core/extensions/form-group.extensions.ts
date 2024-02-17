import { FormGroup } from '@angular/forms';
// export {}
declare module '@angular/forms' {
  interface FormGroup {
    containError(
      this: FormGroup,
      propertyName: string,
      propertyError: string,
    ): boolean;
    checkTouchedOrDirty(this: FormGroup, propertyName: string): boolean;
    getMessageError(
      this: FormGroup,
      validationMessages: any,
      propertyName: string,
      propertyError: string,
    ): string;
  }
}

FormGroup.prototype.containError = function (
  this: FormGroup,
  propertyName: string,
  propertyError: string,
): boolean {
  return this.get(propertyName)?.errors?.[propertyError] ?? false;
};

FormGroup.prototype.checkTouchedOrDirty = function (
  this: FormGroup,
  propertyName: string,
): boolean {
  return (
    (this.get(propertyName)?.dirty || this.get(propertyName)?.touched) ?? false
  );
};

FormGroup.prototype.getMessageError = function (
  this: FormGroup,
  validationMessages: any,
  propertyName: string,
  propertyError: string,
): string {
  return validationMessages[propertyName][propertyError];
};
