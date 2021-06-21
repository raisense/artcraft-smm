class PrismicImage {
  constructor(alt, url) {
    this.alt = alt;
    this.url = url;
  }

  static fromPrismic(data) {
    return new PrismicImage(data.alt, data.url);
  }
}

class PortfolioItem {
  /**
   *
   * @param {String} id
   * @param {String} name
   * @param {PrismicImage} mainImage
   * @param {Array<PrismicImage} images
   * @param {RichTextBlock} description Prismic richtext object
   * @param {String} lang
   */
  constructor(id, name, mainImage, images, description, lang) {
    this.id = id;
    this.name = name;
    this.mainImage = mainImage;
    this.images = images;
    this.description = description;
    this.lang = lang;
  }

  static fromPrismic(data) {
    return new PortfolioItem(
      data.id,
      data.dataRaw.project_name,
      PrismicImage.fromPrismic(data.dataRaw.main_image),
      data.dataRaw.images.map((e) => PrismicImage.fromPrismic(e.image)),
      data.dataRaw.description,
      data.lang
    );
  }
}

class PackageItem {
  /**
   *
   * @param {String} id
   * @param {String} name
   * @param {Array<String>} offerings
   * @param {String} price
   * @param {String} lang
   */
  constructor(id, name, offerings, price, lang) {
    this.id = id;
    this.name = name;
    this.offerings = offerings;
    this.price = price;
    this.lang = lang;
  }

  static fromPrismic(data) {
    return new PackageItem(
      data.id,
      data.dataRaw.package_name,
      data.dataRaw.offers.map((e) => e.offer),
      data.dataRaw.price_field,
      data.lang
    );
  }
}

class Partners {
  /**
   *
   * @param {Array<PrismicImage} logos
   * @param {String} lang
   */
  constructor(logos, lang) {
    this.logos = logos;
    this.lang = lang;
  }

  static fromPrismic(data) {
    return new Partners(
      data.dataRaw.partners.map((e) =>
        PrismicImage.fromPrismic(e.partner_logo)
      ),
      data.lang
    );
  }
}

class Social {
  /**
   *
   * @param {PrismicImage} icon
   * @param {String} name
   * @param {String} link
   */
  constructor(icon, name, link) {
    this.icon = icon;
    this.name = name;
    this.link = link;
  }

  static fromPrismic(data) {
    return new Social(
      PrismicImage.fromPrismic(data.icon),
      data.name,
      data.social_link.url
    );
  }
}

class Geo {
  /**
   *
   * @param {float} lat
   * @param {float} long
   */
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  static fromPrismic(data) {
    return new Geo(data.latitude, data.longitude);
  }
}

class Contacts {
  /**
   *
   * @param {String} address
   * @param {Geo} addressGeo
   * @param {String} email
   * @param {String} phone
   * @param {Array<Social} socials
   * @param {String} lang
   */
  constructor(address, addressGeo, email, phone, socials, lang) {
    this.address = address;
    this.addressGeo = addressGeo;
    this.email = email;
    this.phone = phone;
    this.socials = socials;
    this.lang = lang;
  }

  static fromPrismic(data) {
    return new Contacts(
      data.dataRaw.address,
      Geo.fromPrismic(data.dataRaw.address_geo),
      data.dataRaw.email,
      data.dataRaw.phone,
      data.dataRaw.socials.map((e) => Social.fromPrismic(e)),
      data.lang
    );
  }
}

class PageLocalization {
  constructor(
    portfolio_text,
    services_text,
    price_text,
    contact_us_text,
    details_text,
    contact_package_text,
    address_text,
    phone_text,
    nav_menu_text,
    contacts_text,
    socials_text,
    send_text,
    your_name_text,
    your_phone_text,
    message_text,
    about_project_text
  ) {
    this.portfolio_text = portfolio_text;
    this.services_text = services_text;
    this.price_text = price_text;
    this.contact_us_text = contact_us_text;
    this.details_text = details_text;
    this.contact_package_text = contact_package_text;
    this.address_text = address_text;
    this.phone_text = phone_text;
    this.nav_menu_text = nav_menu_text;
    this.contacts_text = contacts_text;
    this.socials_text = socials_text;
    this.send_text = send_text;
    this.your_name_text = your_name_text;
    this.your_phone_text = your_phone_text;
    this.message_text = message_text;
    this.about_project_text = about_project_text;
  }

  static fromPrismic(data) {
    return new PageLocalization(
      data.dataRaw.portfolio_text,
      data.dataRaw.services_text,
      data.dataRaw.price_text,
      data.dataRaw.contact_us_text,
      data.dataRaw.details_text,
      data.dataRaw.contact_package_text,
      data.dataRaw.address_text,
      data.dataRaw.phone_text,
      data.dataRaw.nav_menu_text,
      data.dataRaw.contacts_text,
      data.dataRaw.socials_text,
      data.dataRaw.send_text,
      data.dataRaw.your_name_text,
      data.dataRaw.your_phone_text,
      data.dataRaw.message_text,
      data.dataRaw.about_project_text
    );
  }
}

class PageMisc {
  /**
   *
   * @param {PrismicImage} logo
   * @param {RichTextBlock} introText
   * @param {PrismicImage} introImage
   * @param {PageLocalization} localization
   * @param {String} lang
   */
  constructor(logo, introText, introImage, localization, lang) {
    this.logo = logo;
    this.introText = introText;
    this.introImage = introImage;
    this.localization = localization;
    this.lang = lang;
  }

  static fromPrismic(data) {
    return new PageMisc(
      PrismicImage.fromPrismic(data.dataRaw.logo),
      data.dataRaw.intro_text,
      PrismicImage.fromPrismic(data.dataRaw.intro_image),
      PageLocalization.fromPrismic(data),
      data.lang
    );
  }
}

class Service {
  /**
   *
   * @param {PrismicImage} icon
   * @param {String} title
   * @param {RichTextBlock} description
   * @param {String} lang
   */
  constructor(icon, title, description, lang) {
    this.icon = icon;
    this.title = title;
    this.description = description;
    this.lang = lang;
  }

  static fromPrismic(data) {
    return new Service(
      PrismicImage.fromPrismic(data.dataRaw.icon),
      data.dataRaw.title,
      data.dataRaw.description,
      data.lang
    );
  }
}

export default PrismicImage;
export { PortfolioItem };
export { PackageItem };
export { Partners };
export { Social };
export { Geo };
export { Contacts };
export { PageMisc };
export { Service };
export { PageLocalization };
