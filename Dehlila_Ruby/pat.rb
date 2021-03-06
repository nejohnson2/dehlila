require 'enumerator'
#require File.expand_path("/Users/Luce/Desktop/ElizaRuby_update/enumerator.rb")

class Pattern
  def initialize(pattern)
    @pattern = pattern.map do |p| 
      variable?(p) ? p : p.downcase
    end
  end
  
  # Does pattern match input? Any variable can match anything
  def match(input, pattern = @pattern)
    return nil unless input.length == pattern.length
    pattern.enum_for(:zip, input).all? do |p, i|
      (p.is_a?(Array) && i.is_a?(Array) && match(i, p)) ||
        variable?(p) ||
        p == i
    end
  end
  
  def variable?(pattern)
    pattern.is_a?(String) && pattern[0] == ??
  end
end
