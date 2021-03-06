#require 'pat5'

require File.expand_path("./Dehlila_Ruby/pat5.rb")


module Enumerable
  def some?
    self.each do |v|
      result = yield v
      return result if result

    end
    nil
  end
end

class Array
  def random_elt
    self[rand(self.length)]
  end
end

class Rule
  attr_reader :pattern, :responses

  def initialize(pattern, *responses)
    @pattern, @responses = pattern, responses
  end

  ELIZA_RULES = 
    [
     Rule.new(Pattern.new(%w(*x hello *y)),
              "How do you do. Please state your problem",
              "Hello",
              "Hello.  My name is Delilah",
              "What can I help you with?",
              "Is there something you want to talk about?",
              "What's on your mind?",
              "Have we met?",
              "What's your name?"),
     Rule.new(Pattern.new(%w(*x ok *y)),
     		  "Does that settle everything?",
     		  "Ok?"),
     Rule.new(Pattern.new(%w(*x I want *y)),
              "What would it mean if you got ?y?",
              "Why do you want ?y?",
              "Suppose you got ?y soon"),
     Rule.new(Pattern.new(%w(*x if *y)),
              "Do you really think it's likely that ?y? ",
              "Do you wish that ?y?",
              "What do you think about ?y?",
              "Really-- if ?y?"),
     Rule.new(Pattern.new(%w(*x no *y)),
              "Why not?",
              "I think you should",
              "Maybe you should",
              "Have you been drinking?",
              "You are being a bit negative",
              "Don't give me that!",
              "Why don't you ?y",
              "Do you always say no",
              "Are you saying \"NO\" just to be negative?"),
     Rule.new(Pattern.new(%w(*x I was *y)),
              "Were you really?",
              "Perhaps I already knew you were ?y?",
              "Why do you tell me you were ?y now?"),
     Rule.new(Pattern.new(%w(*x I feel *y)),
              "Do you often feel ?y?"),
     Rule.new(Pattern.new(%w(*x I felt *y)),
              "What other feelings do you have?")
    ]
end

module Eliza
  class << self
    def run(rules = Rule::ELIZA_RULES)

	  # 'ARGV[0]' will read in anything after 'ruby ..../eliza2.rb'
	  # it is important to note that in the web.js file, the variable
	  # being passed is in double quotes!!  This makes the variable a
	  # string before it gets passed into ARGV[0] 
      $utterance = ARGV[0]

     if $utterance == nil
        puts "I am sorry I didnt understand you" 
     else

        # This was used in the original verison because it set the global variable
        # 'Eliza_Response_PPP which was the read in the main ruby file (aka response html)
        # $Eliza_Response_PPP = eliza_rule($utterance.downcase.split, rules)
 
 		# using puts here alows the function simply to output the response through stdout
 		# which is accessed in the web.js file
        puts eliza_rule($utterance.downcase.split, rules)        

      end
    end
    
    def eliza_rule(input, rules)

      rules.some? do |rule|
        result = rule.pattern.match(input)
        if result
          switch_viewpoint(result).inject(rule.responses.random_elt) do |sum, repl|
            sum.gsub(repl[0], repl[1].join(" "))
     
          end
        end
      end
    end
    
    def switch_viewpoint(words)
      replacements = [%w(I you), 
                      %w(you I),
                      %w(me you), 
                      %w(am are),
                      %w(myself yourself),]
      hash = {}
      words.each do |key, val|
        hash[key] = replacements.inject(val) do |sum, repl|
          sum.map { |val| val == repl[0] ? repl[1] : val}
        end
      end
      hash
    end
  end
end

# This does not need to be used in the node.js version of Dehlila
# 
# if __FILE__ == $0
#  Eliza.run
# end