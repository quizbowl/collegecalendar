
module Jekyll
  module Timeago
    module Core
      extend self
      
      alias_method :build_time_ago_slots_old, :build_time_ago_slots

      # Builds time ranges: ['1 month', '5 days']
      # - days_passed: integer in absolute
      # - depth: level of detail
      # - current_slots: built time slots
      def build_time_ago_slots(days_passed, depth, current_slots = [])
        return current_slots if depth == 0 || days_passed == 0

        time_range = days_to_time_range(days_passed)
        days       = DAYS_PER[time_range]
        num_elems  = (days_passed / days).to_i

        half = (days_passed.to_f / days) - num_elems >= 0.5
        half_sym = if half then '½' else '' end

        range_type = if num_elems == 1 and not half
          t(time_range[0...-1]) # singularize key
        else
          t(time_range)
        end

        current_slots << "#{num_elems}#{half_sym} #{range_type}"
        pending_days  = days_passed - (num_elems * days)
        build_time_ago_slots(pending_days, depth - 1, current_slots)
      end

    end
  end
end
