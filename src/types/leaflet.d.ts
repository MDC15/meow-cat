declare module "leaflet" {
  export interface Map {
    setView(center: [number, number], zoom: number): Map;
    remove(): void;
    on(event: "click", handler: (event: { latlng: { lat: number; lng: number } }) => void): Map;
    off(event: "click"): Map;
    fitBounds(bounds: unknown, options?: { maxZoom?: number; animate?: boolean }): Map;
    invalidateSize(): Map;
    removeLayer(layer: unknown): Map;
  }

  export interface Marker {
    on(event: "click", handler: () => void): Marker;
    addTo(map: Map): Marker;
    remove(): void;
  }

  export interface TileLayerEvented {
    on(event: "tileload", handler: () => void): TileLayer;
    on(event: "tileerror", handler: () => void): TileLayer;
    addTo(map: Map): TileLayer;
  }

  export interface TileLayer extends TileLayerEvented {}

  export interface LeafletApi {
    map(el: HTMLElement, options?: Record<string, unknown>): Map;
    tileLayer(url: string, options?: Record<string, unknown>): TileLayer;
    marker(latlng: [number, number], options?: Record<string, unknown>): Marker;
    divIcon(options: Record<string, unknown>): unknown;
    latLngBounds(latlngs: [number, number][]): { pad(amount: number): unknown };
  }

  const api: LeafletApi;
  export default api;
}
