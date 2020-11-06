export class NavbarSchema {
  links?: NavbarLink[];
  logoSrc: string = 'assets/images/knipper_logo.png';
  logoAlt: string = 'Standard DTP';
  logoLink: string;
  logoPermissions: string[];
  logoTitle: string;
}

export class NavbarLink {
  display: string;
  id: string;
  link?: string;
  class?: string;
  icon?: string;
  menu?: NavbarMenuSection[];
  permissions?: any[];
  hide?: boolean = false;
  classificationValue?: string;
  url?: string;
  menuChildLinks?: string[];
}

export class NavbarMenuSection {
  title?: string;
  class?: string;
  links: NavbarLink[];
  hide?: boolean = false;
  classificationType?: string;
}
