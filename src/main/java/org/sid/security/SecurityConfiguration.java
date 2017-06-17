package org.sid.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	/**
	 * This section defines the user accounts which can be used for
	 * authentication as well as the roles each user has.
	 */
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
		.withUser("user").password("user").roles("USER").and()
		.withUser("admin").password("admin").roles("USER", "ADMIN");
	}

	/**
	 * This section defines the security policy for the app.
	 * - BASIC authentication is supported (enough for this REST-based demo)
	 * - /employees is secured using URL security shown below
	 * - CSRF headers are disabled since we are only testing the REST interface,
	 *   not a web one.
	 *
	 * NOTE: GET is not shown which defaults to permitted.
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
		.httpBasic().and()
		.authorizeRequests()
		.antMatchers(HttpMethod.POST, "/employees").hasRole("ADMIN")
		.antMatchers(HttpMethod.PUT, "/employees/**").hasRole("ADMIN")
		.antMatchers(HttpMethod.PATCH, "/employees/**").hasRole("ADMIN").and()
		.csrf().disable();
	}

}