class Bench < ActiveRecord::Base
  validates :description, :lat, :lng, presence: true

  def self.in_bounds(bounds)
    lat_range = [bounds['southWest']['lat'].to_f, bounds['northEast']['lat'].to_f]
    lng_range = [bounds['southWest']['lng'].to_f, bounds['northEast']['lng'].to_f]
    Bench.where(:lat => lat_range[0]..lat_range[1], :lng => lng_range[0]..lng_range[1])
  end
end
