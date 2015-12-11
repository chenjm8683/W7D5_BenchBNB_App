class Api::BenchesController < ApplicationController
  def index
    # render json: Bench.all
    @benches = Bench.all
    render :index
  end

  def create
    render json: Bench.create!(bench_params)
  end

  private
  def bench_params
  end
end
