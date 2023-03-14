export const TOKEN = "token";
export const VERSION_HOTEL_SERVICE = "1.0";

/// sevice gate ///
export const AUTH_SERVICE = "AUTH_SERVICE";
export const CRM_SERVICE = "CRM_SERVICE";
export const FLYX_SERVICE = "FLYX_SERVICE";
export const HOTEL_SERVICE = "HOTEL_SERVICE";
export const HMS_SERVICE = "HMS_SERVICE";
export const PAYMENT_SERVICE = "PAYMENT_SERVICE";
export const FINANCE_SERVICE = "FINANCE_SERVICE";
export const PAYMENT_SERVICE_ACCOUNTING = "PAYMENT_SERVICE_ACCOUNTING";
export const TRIPIONE_SERVICE = "TRIPIONE_SERVICE";

/// sevice flight api ///
export const ACCOUNT_SERVICE = "ACCOUNT_SERVICE";
/// frefix sevice gate///
export const PRE_URL_AUTH_SERVICE = "/auth";
export const PRE_URL_CRM_SERVICE = "/crm";
export const PRE_URL_FLYX_SERVICE = "/flyx";
export const PRE_URL_ACCOUNT_SERVICE = "/v3/account";
export const PRE_URL_HOTEL_SERVICE = "/hotels";
export const PRE_URL_HMS_SERVICE = "/hms-premium";
export const PRE_URL_PAYMENT_SERVICE = "/payment";
export const PRE_URL_FINANCE_SERVICE = "/finance";
export const PRE_URL_PAYMENT_SERVICE_ACCOUNTING = "/payment";
export const PRE_URL_TRIPIONE = "/tripione";
/// link ảnh google api ///
export const PRE_URL_GOOGLE_APIS_IMG =
  "https://storage.googleapis.com/tripi-assets/crm_premium";

export const listImg = {
  bannerLoginUrl: `${PRE_URL_GOOGLE_APIS_IMG}/img_banner_loogin.png`,
  imgEmptyInvoiceFlight: `${PRE_URL_GOOGLE_APIS_IMG}/img_empty_invoice_flight.png`,
};
/// data save local storage ///
export const DEVICE_ID = "device-id";
export const LAST_LINK_PREVIEW = "last-link-preview";
export const LAST_FILTERS_FLIGHT_ONLINE = "last-filters-flight-online";
export const LAST_FILTERS_HOTEL_ONLINE = "last-filters-hotel-online";
export const LAST_DATA_BOOKING_FLIGHT_OFFLINE =
  "last-data-booking-flight-offline";
export const IS_COLLAPSIBLE = "isCollapsible";

export const TIME_OUT_QUERY_API_FLIGHT_SEARCH = 800;
export const TIME_OUT_QUERY_API_FLIGHT_REMOVE_FIELD = 300;

export type some = { [key: string]: any };

// routes
export const routes = {
  LOGIN: "/login",
  DASHBOARD: "/",
  LANDING: "/landing",
  SALE: "sale",
  FLIGHT: "flight",
  FLIGHT_ONLINE: "online",
  FLIGHT_OFFLINE: "offline",
  FLIGHT_RECONCILIATION_ERROR: "reconciliation-error",
  FLIGHT_ADD_NEW_TICKET: "add-new-offline-flight-ticket",
  HOTEL: "hotel",
  HOTEL_ONLINE: "online",
  HOTEL_OFFLINE: "offline",
  MARKETING: "marketing",
  MARKETING_BREAKING_NEWS: "breaking-news",
  MARKETING_PROMOTION_CODE: "promotion-code",
  OTHER: "other",
  OTHER_SALE_MANAGER: "manager",
  ANALYTICS: "/analytics",
  ADMIN: "/admin",
  EXAMPLE: "/example",
  APPROVAL: "approval",
  PAYMENT_SUPPORT: "payment-support",
  BANK_TRANSFER: "bank-transfer",
  SUPPORT_TOOLS: "support-tools",
  PAYMENT_TOOL: "payment-tools",
  CREDIT_TRANSFER: "credit-transfer",
};

export const ROLES_APP = {
  ANALYTICS_ROLE: "analytics",
  ADMIN_ROLE: "admin",
  SALE: "sale",
};

export const MAIN_ROLES = {
  SALE: "crm:sale",
  MARKETING: "crm:sale-manager",
  OTHER: "other",
  ADMIN: "crm:admin",
  SUPPORT: "support",
  ACCOUNTANT: "crm:accountant",
  SALE_MANAGER: "crm:sale-manager",
};

export const ROLE_TABLE = {
  [routes.ANALYTICS]: [ROLES_APP.ANALYTICS_ROLE, ROLES_APP.ADMIN_ROLE],
  [routes.ADMIN]: [ROLES_APP.ADMIN_ROLE],
  [routes.SALE]: [ROLES_APP.SALE],
};

export const MAIN_MODULE = [
  {
    id: "hotel",
    name: "Khách sạn",
  },
  {
    id: "flight",
    name: "Vé máy bay",
  },
];

export const CHAIN_SP = [
  "ethereum",
  "polygon",
  "bnb",
  "arbitrumone",
  "optimism",
  "avalanche",
  "gor",
  "mumbai",
];

export const API_KEY = "77725a21-34e0-413e-b66f-dc344b7a9f38";
