FROM ruby:latest

# Install dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  libpq-dev

# Set the working directory
WORKDIR /app

# Copy the Gemfile and Gemfile.lock
COPY Gemfile ./

# Install Ruby dependencies
RUN bundle install

# Copy the rest of the codebase
COPY . .

CMD []
