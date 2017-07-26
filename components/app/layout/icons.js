import React from 'react';

export default class Icons extends React.Component {
  shouldComponentUpdate() {
    // This component doesn't need to re-render because
    // everything is static
    return false;
  }

  render() {
    return (
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <symbol id="icon-item-unknown" viewBox="0 0 24 24">
            <title>item-unknown</title>
            <path fill="#fff" opacity="0.7" style={{ fill: 'var(--color1, #fff)' }} d="M10.269 22.328v-5.45c0-0.42 0.026-0.845 0.079-1.276s0.142-0.824 0.268-1.181c-0.273 0.294-0.578 0.556-0.914 0.787s-0.693 0.462-1.071 0.693l-4.599 2.678-2.268-3.749 4.599-2.677c0.399-0.231 0.798-0.431 1.197-0.599s0.808-0.294 1.229-0.378c-0.42-0.084-0.83-0.215-1.229-0.394s-0.798-0.383-1.197-0.614l-4.599-2.741 2.268-3.78 4.599 2.772c0.378 0.231 0.74 0.467 1.087 0.709s0.656 0.509 0.929 0.803c-0.252-0.714-0.378-1.522-0.378-2.426v-5.512h4.599v5.45c0 0.441-0.026 0.872-0.079 1.291s-0.142 0.819-0.268 1.197c0.273-0.294 0.577-0.562 0.913-0.803s0.693-0.478 1.071-0.709l4.599-2.709 2.268 3.78-4.599 2.678c-0.42 0.231-0.829 0.43-1.228 0.598s-0.808 0.294-1.228 0.378c0.42 0.084 0.835 0.215 1.244 0.394s0.814 0.383 1.213 0.614l4.599 2.74-2.268 3.749-4.599-2.741c-0.399-0.231-0.766-0.467-1.102-0.709s-0.651-0.509-0.945-0.803c0.273 0.735 0.409 1.543 0.409 2.425v5.512h-4.599z" />
          </symbol>
          <symbol id="icon-item-date" viewBox="0 0 21 24">
            <title>item-date</title>
            <path fill="#fff" opacity="0.7" style={{ fill: 'var(--color1, #fff)' }} d="M16 2.667h5.333v21.333h-21.333v-21.333h5.333v-2.667h2.667v2.667h5.333v-2.667h2.667v2.667zM2.667 10.667v10.667h16v-10.667h-16z" />
          </symbol>
          <symbol id="icon-item-category" viewBox="0 0 24 24">
            <title>item-category</title>
            <path fill="#fff" opacity="0.7" style={{ fill: 'var(--color1, #fff)' }} d="M0 0h8.4l15.6 15.6-8.4 8.4-15.6-15.6v-8.4zM6 8.4c1.325 0 2.4-1.075 2.4-2.4s-1.075-2.4-2.4-2.4c-1.325 0-2.4 1.075-2.4 2.4s1.075 2.4 2.4 2.4z" />
          </symbol>
          <symbol id="icon-item-number" viewBox="0 0 19 24">
            <title>item-number</title>
            <path fill="#fff" opacity="0.7" style={{ fill: 'var(--color1, #fff)' }} d="M12.964 17.635l-1.201 6.365h-1.763c-0.312 0-0.582-0.125-0.811-0.374s-0.343-0.556-0.343-0.92c0-0.052 0.003-0.101 0.008-0.148s0.013-0.096 0.023-0.148l0.92-4.774h-3.198l-0.905 4.961c-0.094 0.499-0.307 0.858-0.64 1.076s-0.702 0.328-1.108 0.328h-1.7l1.186-6.365h-1.794c-0.333 0-0.588-0.081-0.764-0.242s-0.265-0.429-0.265-0.803c0-0.146 0.016-0.312 0.047-0.499l0.203-1.232h2.964l0.811-4.306h-3.338l0.296-1.607c0.073-0.395 0.234-0.689 0.484-0.881s0.655-0.289 1.217-0.289h1.732l0.967-5.023c0.083-0.416 0.276-0.738 0.577-0.967s0.655-0.343 1.061-0.343h1.747l-1.186 6.334h3.182l1.201-6.334h1.716c0.364 0 0.66 0.104 0.889 0.312s0.343 0.473 0.343 0.796c0 0.104-0.005 0.182-0.016 0.234l-0.967 4.992h3.167l-0.296 1.607c-0.073 0.395-0.237 0.689-0.491 0.881s-0.658 0.289-1.209 0.289h-1.56l-0.796 4.306h2.215c0.333 0 0.585 0.081 0.757 0.242s0.257 0.434 0.257 0.819c0 0.146-0.016 0.312-0.047 0.499l-0.187 1.217h-3.385zM6.989 14.858h3.198l0.796-4.306h-3.182l-0.811 4.306z" />
          </symbol>
          <symbol id="icon-logo-cms" viewBox="0 0 145 24">
            <title>logo-cms</title>
            <path d="M34.62 19.49c-0.035 0-0.071 0.016-0.108 0.048-0.083 0.072-0.166 0.135-0.248 0.187s-0.171 0.095-0.266 0.129c-0.095 0.034-0.199 0.059-0.311 0.075s-0.238 0.024-0.378 0.024c-0.23 0-0.445-0.040-0.644-0.121s-0.372-0.199-0.518-0.353c-0.146-0.154-0.261-0.344-0.345-0.567s-0.127-0.478-0.127-0.764c0-0.277 0.042-0.527 0.127-0.751s0.202-0.413 0.353-0.569c0.151-0.156 0.331-0.275 0.541-0.36s0.44-0.126 0.692-0.126c0.14 0 0.264 0.010 0.371 0.030s0.202 0.045 0.283 0.075c0.081 0.030 0.151 0.062 0.21 0.096s0.111 0.066 0.154 0.096c0.044 0.030 0.082 0.055 0.113 0.075s0.062 0.030 0.090 0.030c0.037 0 0.066-0.007 0.085-0.021s0.037-0.031 0.053-0.053l0.207-0.284c-0.195-0.179-0.418-0.321-0.669-0.425s-0.549-0.157-0.896-0.157c-0.351 0-0.671 0.057-0.961 0.171s-0.54 0.274-0.748 0.481c-0.208 0.207-0.37 0.454-0.485 0.742s-0.173 0.604-0.173 0.949c0 0.345 0.054 0.662 0.161 0.949s0.259 0.534 0.454 0.74c0.195 0.206 0.431 0.365 0.707 0.479s0.584 0.171 0.924 0.171c0.388 0 0.719-0.061 0.994-0.182s0.509-0.291 0.702-0.508l-0.25-0.265c-0.028-0.028-0.060-0.042-0.095-0.042zM40.022 18.148c0 0.343-0.056 0.658-0.168 0.945s-0.269 0.533-0.473 0.74c-0.204 0.207-0.449 0.367-0.735 0.481s-0.602 0.171-0.948 0.171c-0.346 0-0.662-0.057-0.947-0.171s-0.529-0.274-0.733-0.481c-0.204-0.207-0.362-0.453-0.473-0.74s-0.168-0.601-0.168-0.945c0-0.343 0.056-0.658 0.168-0.945s0.269-0.534 0.473-0.742c0.204-0.208 0.448-0.369 0.733-0.484s0.6-0.173 0.947-0.173c0.346 0 0.662 0.058 0.948 0.173s0.531 0.276 0.735 0.484c0.204 0.208 0.362 0.455 0.473 0.742s0.168 0.601 0.168 0.945zM39.368 18.148c0-0.281-0.039-0.534-0.118-0.758s-0.191-0.413-0.335-0.567c-0.145-0.155-0.32-0.273-0.526-0.356s-0.436-0.125-0.69-0.125c-0.252 0-0.481 0.042-0.687 0.125s-0.382 0.202-0.527 0.356c-0.146 0.154-0.258 0.344-0.337 0.567s-0.118 0.476-0.118 0.758c0 0.281 0.039 0.533 0.118 0.756s0.191 0.411 0.337 0.566c0.146 0.154 0.322 0.273 0.527 0.355s0.435 0.123 0.687 0.123c0.254 0 0.484-0.041 0.69-0.123s0.381-0.2 0.526-0.355c0.145-0.154 0.256-0.343 0.335-0.566s0.118-0.475 0.118-0.756zM41.066 15.856h-0.329v4.581h0.559v-3.264c0-0.043-0.001-0.090-0.003-0.141s-0.005-0.103-0.010-0.157l2.725 3.449c0.033 0.040 0.066 0.069 0.1 0.086s0.076 0.026 0.127 0.026h0.322v-4.581h-0.559v3.244c0 0.049 0.001 0.1 0.003 0.152s0.007 0.106 0.013 0.161l-2.728-3.452c-0.035-0.043-0.066-0.071-0.094-0.085s-0.070-0.021-0.127-0.021zM48.758 15.856h-3.687v0.521h1.528v4.060h0.638v-4.060h1.522v-0.521zM52.175 15.856h-2.902v4.581h2.902v-0.505h-2.261v-1.563h1.831v-0.486h-1.831v-1.522h2.261v-0.505zM53.265 15.856h-0.329v4.581h0.559v-3.264c0-0.043-0.001-0.090-0.003-0.141s-0.005-0.103-0.010-0.157l2.725 3.449c0.033 0.040 0.066 0.069 0.1 0.086s0.076 0.026 0.127 0.026h0.322v-4.581h-0.559v3.244c0 0.049 0.001 0.1 0.003 0.152s0.007 0.106 0.013 0.161l-2.728-3.452c-0.035-0.043-0.066-0.071-0.094-0.085s-0.070-0.021-0.127-0.021zM60.957 15.856h-3.687v0.521h1.528v4.060h0.638v-4.060h1.522v-0.521zM64.902 18.781l-1.627-2.819c-0.028-0.049-0.058-0.079-0.089-0.090s-0.074-0.016-0.131-0.016h-0.47v4.581h0.559v-3.366c0-0.045-0.002-0.094-0.005-0.147s-0.008-0.108-0.015-0.163l1.65 2.874c0.055 0.096 0.131 0.144 0.23 0.144h0.092c0.099 0 0.175-0.048 0.23-0.144l1.614-2.864c-0.004 0.053-0.008 0.105-0.010 0.157s-0.003 0.099-0.003 0.144v3.366h0.559v-4.581h-0.47c-0.057 0-0.101 0.005-0.131 0.016s-0.060 0.040-0.089 0.090l-1.594 2.816c-0.031 0.055-0.058 0.11-0.082 0.165s-0.047 0.111-0.069 0.171c-0.022-0.058-0.044-0.115-0.067-0.171s-0.050-0.11-0.081-0.161zM72.351 20.437h-0.493c-0.057 0-0.103-0.014-0.138-0.042s-0.061-0.063-0.079-0.105l-0.44-1.106h-2.113l-0.44 1.106c-0.015 0.038-0.042 0.072-0.079 0.102s-0.083 0.045-0.138 0.045h-0.493l1.883-4.581h0.647l1.883 4.581zM69.265 18.736h1.758l-0.739-1.864c-0.048-0.115-0.095-0.259-0.141-0.432-0.024 0.087-0.048 0.168-0.071 0.241s-0.045 0.138-0.067 0.193l-0.739 1.86zM73.119 15.856h-0.329v4.581h0.559v-3.264c0-0.043-0.001-0.090-0.003-0.141s-0.005-0.103-0.010-0.157l2.725 3.449c0.033 0.040 0.066 0.069 0.1 0.086s0.076 0.026 0.127 0.026h0.322v-4.581h-0.559v3.244c0 0.049 0.001 0.1 0.003 0.152s0.007 0.106 0.013 0.161l-2.728-3.452c-0.035-0.043-0.066-0.071-0.094-0.085s-0.070-0.021-0.127-0.021zM81.479 20.437h-0.493c-0.057 0-0.103-0.014-0.138-0.042s-0.061-0.063-0.079-0.105l-0.44-1.106h-2.113l-0.44 1.106c-0.015 0.038-0.042 0.072-0.079 0.102s-0.083 0.045-0.138 0.045h-0.493l1.883-4.581h0.647l1.883 4.581zM78.393 18.736h1.758l-0.739-1.864c-0.048-0.115-0.095-0.259-0.141-0.432-0.024 0.087-0.048 0.168-0.071 0.241s-0.045 0.138-0.067 0.193l-0.739 1.86zM83.88 19.986c-0.254 0-0.486-0.042-0.697-0.125s-0.392-0.204-0.546-0.361c-0.153-0.158-0.272-0.35-0.357-0.577s-0.127-0.485-0.127-0.775c0-0.277 0.041-0.527 0.122-0.75s0.197-0.412 0.348-0.569c0.151-0.157 0.334-0.277 0.549-0.361s0.455-0.126 0.72-0.126c0.182 0 0.339 0.014 0.472 0.042s0.248 0.061 0.345 0.101c0.097 0.039 0.18 0.080 0.248 0.123s0.129 0.079 0.184 0.109c0.042 0.023 0.080 0.035 0.115 0.035 0.059 0 0.107-0.029 0.145-0.086l0.181-0.281c-0.101-0.090-0.209-0.17-0.325-0.241s-0.243-0.132-0.38-0.182c-0.137-0.050-0.285-0.088-0.445-0.115s-0.333-0.040-0.519-0.040c-0.368 0-0.701 0.056-0.997 0.169s-0.55 0.272-0.759 0.478c-0.209 0.206-0.37 0.452-0.483 0.74s-0.169 0.606-0.169 0.956c0 0.345 0.058 0.662 0.173 0.949s0.276 0.534 0.481 0.74c0.206 0.206 0.451 0.365 0.736 0.479s0.598 0.171 0.94 0.171c0.195 0 0.376-0.010 0.542-0.030s0.323-0.051 0.468-0.093c0.146-0.042 0.283-0.093 0.411-0.155s0.251-0.134 0.37-0.217v-1.758h-1.446v0.352c0 0.034 0.013 0.063 0.038 0.086s0.059 0.035 0.1 0.035h0.73v1.010c-0.083 0.043-0.167 0.080-0.25 0.113s-0.172 0.061-0.266 0.085c-0.094 0.023-0.194 0.041-0.301 0.053s-0.223 0.018-0.35 0.018zM89.351 15.856h-2.902v4.581h2.902v-0.505h-2.261v-1.563h1.831v-0.486h-1.831v-1.522h2.261v-0.505zM90.812 18.525h0.483c0.088 0 0.153 0.011 0.197 0.034s0.084 0.059 0.122 0.11l1.223 1.637c0.055 0.087 0.14 0.131 0.256 0.131h0.565l-1.374-1.819c-0.061-0.085-0.131-0.15-0.21-0.195 0.182-0.040 0.345-0.1 0.488-0.179s0.265-0.174 0.365-0.286c0.1-0.112 0.176-0.238 0.228-0.379s0.079-0.292 0.079-0.454c0-0.194-0.034-0.369-0.102-0.526s-0.173-0.29-0.314-0.401c-0.141-0.111-0.32-0.196-0.537-0.254s-0.474-0.088-0.772-0.088h-1.331v4.581h0.634v-1.912zM90.812 18.074v-1.729h0.697c0.366 0 0.641 0.069 0.827 0.208s0.278 0.344 0.278 0.617c0 0.134-0.024 0.257-0.072 0.368s-0.12 0.206-0.215 0.286c-0.095 0.080-0.214 0.142-0.355 0.185s-0.305 0.066-0.491 0.066h-0.667zM37.545 7.163c-0.345 0.468-0.848 0.777-1.512 0.902l2.387 4.012h-2.48l-1.962-3.867h-0.889v3.867h-2.065v-9.52h3.497c0.478 0 0.931 0.059 1.359 0.153s0.804 0.262 1.127 0.481c0.323 0.219 0.579 0.513 0.77 0.883s0.285 0.831 0.285 1.385c0 0.669-0.173 1.237-0.517 1.705zM41.348 8.21v1.785h4.424v2.082h-6.489v-9.52h6.194v2.082h-4.13v1.487h4.13v2.082h-4.13zM52.073 7.063c0.323 0.196 0.59 0.459 0.802 0.789s0.318 0.771 0.318 1.324c0 0.526-0.097 0.985-0.292 1.377s-0.458 0.718-0.789 0.977-0.716 0.45-1.154 0.575c-0.437 0.125-0.9 0.187-1.386 0.187-0.61 0-1.176-0.094-1.698-0.281s-1.008-0.491-1.459-0.91l1.472-1.631c0.212 0.285 0.48 0.506 0.802 0.662s0.656 0.234 1.001 0.234c0.168 0 0.338-0.020 0.511-0.060s0.327-0.1 0.464-0.181 0.247-0.182 0.332-0.307c0.084-0.125 0.126-0.272 0.126-0.442 0-0.285-0.109-0.51-0.325-0.675s-0.488-0.306-0.816-0.421-0.681-0.232-1.061-0.348c-0.38-0.116-0.734-0.272-1.061-0.468s-0.599-0.455-0.816-0.776c-0.217-0.321-0.325-0.745-0.325-1.271 0-0.508 0.099-0.954 0.298-1.338s0.464-0.704 0.796-0.963c0.332-0.258 0.714-0.452 1.147-0.582s0.88-0.194 1.339-0.194c0.53 0 1.043 0.076 1.538 0.228s0.942 0.406 1.339 0.762l-1.419 1.565c-0.168-0.214-0.396-0.372-0.683-0.475s-0.559-0.154-0.815-0.154c-0.15 0-0.305 0.018-0.464 0.053s-0.309 0.092-0.451 0.167c-0.141 0.076-0.256 0.176-0.345 0.301s-0.132 0.277-0.132 0.455c0 0.286 0.106 0.504 0.318 0.655s0.479 0.281 0.802 0.388c0.322 0.107 0.67 0.214 1.041 0.321s0.718 0.259 1.041 0.455zM62.569 3.686c0.451 0.433 0.803 0.956 1.055 1.572s0.378 1.302 0.378 2.060c0 0.758-0.126 1.445-0.378 2.060s-0.603 1.139-1.055 1.572c-0.451 0.433-0.985 0.765-1.604 0.996s-1.295 0.348-2.029 0.348c-0.734 0-1.41-0.116-2.029-0.348s-1.154-0.564-1.605-0.996-0.802-0.956-1.055-1.572c-0.252-0.615-0.378-1.302-0.378-2.060s0.126-1.445 0.378-2.060c0.252-0.616 0.603-1.139 1.055-1.572s0.985-0.765 1.605-0.997c0.619-0.232 1.295-0.348 2.029-0.348s1.41 0.116 2.029 0.348c0.619 0.232 1.154 0.564 1.604 0.997zM70.844 8.32v-5.763h2.065v5.843c0 0.562-0.057 1.079-0.224 1.551s-0.39 0.883-0.721 1.231c-0.332 0.348-0.747 0.62-1.242 0.816s-1.069 0.294-1.714 0.294c-0.654 0-1.235-0.098-1.731-0.294s-0.921-0.468-1.253-0.816-0.607-0.758-0.775-1.231c-0.168-0.472-0.304-0.99-0.304-1.551v-5.843h2.065v5.763c0 0.294 0.1 0.566 0.193 0.816s0.277 0.466 0.445 0.649c0.168 0.183 0.368 0.325 0.603 0.428s0.487 0.154 0.761 0.154c0.274 0 0.523-0.051 0.752-0.154s0.422-0.245 0.59-0.428c0.168-0.183 0.285-0.399 0.378-0.649s0.113-0.522 0.113-0.816zM81.175 7.163c-0.345 0.468-0.849 0.777-1.512 0.902l2.387 4.012h-2.48l-1.962-3.867h-1.159v3.867h-2.065v-9.52h3.767c0.478 0 0.931 0.059 1.359 0.153s0.804 0.262 1.127 0.481c0.323 0.219 0.579 0.513 0.77 0.883s0.285 0.831 0.285 1.385c0 0.669-0.173 1.237-0.517 1.705zM88.177 10.099c0.327-0.178 0.597-0.428 0.809-0.749l1.724 1.297c-0.398 0.562-0.902 0.976-1.512 1.244s-1.238 0.401-1.883 0.401c-0.734 0-1.41-0.116-2.029-0.348s-1.154-0.564-1.605-0.996-0.802-0.956-1.055-1.572c-0.252-0.615-0.378-1.302-0.378-2.060s0.126-1.445 0.378-2.060c0.252-0.616 0.603-1.139 1.055-1.572s0.985-0.765 1.605-0.997c0.619-0.232 1.295-0.348 2.029-0.348 0.265 0 0.542 0.025 0.829 0.073s0.57 0.127 0.849 0.234c0.279 0.107 0.546 0.25 0.802 0.428s0.486 0.397 0.69 0.655l-1.591 1.311c-0.204-0.25-0.453-0.441-0.749-0.575s-0.639-0.2-1.028-0.2-0.749 0.076-1.081 0.227c-0.332 0.152-0.619 0.364-0.862 0.635s-0.433 0.595-0.57 0.97c-0.137 0.375-0.206 0.78-0.206 1.217 0 0.446 0.068 0.854 0.206 1.224s0.325 0.691 0.564 0.963c0.238 0.272 0.519 0.484 0.842 0.635s0.67 0.227 1.041 0.227c0.424 0 0.8-0.089 1.127-0.268zM93.557 8.21v1.785h4.719v2.082h-6.784v-9.52h6.489v2.082h-4.424v1.487h4.13v2.082h-4.13zM110.601 2.557h0.902l-2.732 9.52h-1.074l-2.374-8.33h-0.027l-2.374 8.33h-1.074l-2.732-9.52h0.902l2.334 8.33h0.027l2.374-8.33h1.114l2.374 8.33h0.027l2.334-8.33zM115.375 2.557h0.902l3.952 9.52h-0.981l-1.021-2.677h-4.973l-1.061 2.677h-0.915l4.098-9.52zM120.103 3.45v-0.892h7.374v0.892h-3.245v8.627h-0.885v-8.627h-3.245zM134.909 10.681c0.221-0.183 0.416-0.403 0.584-0.662l0.716 0.548c-0.451 0.616-0.972 1.057-1.564 1.324s-1.234 0.401-1.923 0.401c-0.716 0-1.372-0.123-1.969-0.368s-1.107-0.589-1.532-1.030c-0.424-0.441-0.756-0.967-0.995-1.579s-0.358-1.277-0.358-1.999c0-0.722 0.119-1.387 0.358-1.993s0.57-1.13 0.995-1.572c0.424-0.441 0.935-0.787 1.532-1.036s1.253-0.375 1.969-0.375c0.637 0 1.231 0.114 1.784 0.341s1.036 0.609 1.452 1.144l-0.716 0.602c-0.292-0.446-0.665-0.771-1.12-0.977s-0.922-0.308-1.399-0.308c-0.61 0-1.16 0.107-1.651 0.321s-0.908 0.508-1.253 0.883c-0.345 0.375-0.61 0.816-0.796 1.324s-0.278 1.057-0.278 1.645 0.093 1.137 0.278 1.645c0.186 0.508 0.451 0.95 0.796 1.324s0.762 0.669 1.253 0.883c0.491 0.214 1.041 0.321 1.651 0.321 0.239 0 0.486-0.029 0.743-0.087s0.506-0.147 0.749-0.267 0.475-0.272 0.696-0.455zM143.7 2.557h0.885v9.52h-0.885v-4.462h-5.309v4.462h-0.885v-9.52h0.885v4.165h5.309v-4.165zM7.724 4.235l5.453 5.452-7.724 7.724-5.452-5.452 7.724-7.724zM14.291 8.471l-5.349-5.35 3.121-3.121 5.349 5.35-3.121 3.121zM16.276 19.765l-5.452-5.452 7.724-7.724 5.452 5.452-7.724 7.724zM9.709 15.529l5.35 5.35-3.121 3.121-5.35-5.35 3.121-3.121zM35.749 6.046c0.11-0.143 0.165-0.343 0.165-0.602 0-0.241-0.049-0.433-0.146-0.575s-0.221-0.252-0.371-0.328c-0.15-0.076-0.323-0.129-0.517-0.155s-0.384-0.043-0.57-0.043h-1.221v2.082h1.088c0.186 0 0.382 0.032 0.59 0.018s0.396-0.015 0.564-0.082c0.168-0.067 0.307-0.172 0.418-0.314zM61.648 8.541c0.137-0.37 0.206-0.778 0.206-1.224 0-0.437-0.069-0.843-0.206-1.217s-0.334-0.698-0.59-0.97c-0.256-0.272-0.564-0.483-0.922-0.635s-0.758-0.227-1.2-0.227c-0.442 0-0.842 0.076-1.2 0.227s-0.665 0.364-0.922 0.635c-0.256 0.272-0.453 0.595-0.59 0.97s-0.206 0.78-0.206 1.217c0 0.446 0.068 0.854 0.206 1.224s0.334 0.691 0.59 0.963c0.257 0.272 0.564 0.484 0.922 0.635s0.758 0.227 1.2 0.227c0.442 0 0.842-0.076 1.2-0.227s0.665-0.364 0.922-0.635c0.256-0.272 0.453-0.593 0.59-0.963zM79.378 6.046c0.11-0.143 0.165-0.343 0.165-0.602 0-0.241-0.049-0.433-0.146-0.575s-0.221-0.252-0.371-0.328c-0.15-0.076-0.323-0.129-0.517-0.155s-0.384-0.043-0.57-0.043h-1.49v2.082h1.357c0.186 0 0.382 0.032 0.59 0.018s0.395-0.015 0.564-0.082c0.168-0.067 0.307-0.172 0.418-0.314zM113.598 8.805h4.31l-2.122-5.189-2.188 5.189z" />
          </symbol>
          <symbol id="icon-arrow-down" viewBox="0 0 29 24">
            <title>arrow-down</title>
            <path d="M16.65 13.977l7.409-7.409 3.841 3.182-13.5 13.5-13.5-13.5 3.841-3.182 7.409 7.409v-13.227h4.5v13.227z" />
          </symbol>
          <symbol id="icon-arrow-up" viewBox="0 0 29 24">
            <title>arrow-up</title>
            <path d="M16.65 10.023l7.409 7.409 3.841-3.182-13.5-13.5-13.5 13.5 3.841 3.182 7.409-7.409v13.227h4.5v-13.227z" />
          </symbol>
          <symbol id="icon-arrow-left" viewBox="0 0 15 24">
            <title>arrow-left</title>
            <path d="M15.273 3.804l-3.273-3.804-12 12 12 12 3.273-3.804-9.107-8.196z" />
          </symbol>
          <symbol id="icon-arrow-right" viewBox="0 0 15 24">
            <title>arrow-right</title>
            <path d="M0.009 20.196l3.273 3.804 12-12-12-12-3.273 3.804 9.107 8.196z" />
          </symbol>
          <symbol id="icon-view-grid" viewBox="0 0 28 24">
            <title>view-grid</title>
            <path d="M3.463 3h9.692v8.308h-9.692v-8.308zM14.54 3h9.692v8.308h-9.692v-8.308zM14.54 12.692h9.692v8.308h-9.692v-8.308zM3.463 12.692h9.692v8.308h-9.692v-8.308z" />
          </symbol>
          <symbol id="icon-view-list" viewBox="0 0 26 24">
            <title>view-list</title>
            <path d="M3.231 3h4.154v4.154h-4.154v-4.154zM10.154 3h12.461v4.154h-12.461v-4.154zM10.154 9.923h12.461v4.154h-12.461v-4.154zM3.231 9.923h4.154v4.154h-4.154v-4.154zM10.154 16.846h12.461v4.154h-12.461v-4.154zM3.231 16.846h4.154v4.154h-4.154v-4.154z" />
          </symbol>
          <symbol id="icon-info" viewBox="0 0 10 24">
            <title>info</title>
            <path d="M1.462 9.645v-0.977c0.287-0.115 0.671-0.235 1.15-0.359s0.987-0.235 1.523-0.331c0.537-0.096 1.068-0.177 1.595-0.244s0.992-0.101 1.394-0.101l0.517 0.345-2.587 12.389h2.012v0.977c-0.249 0.172-0.541 0.335-0.877 0.489s-0.69 0.287-1.064 0.402c-0.374 0.115-0.752 0.206-1.135 0.273s-0.747 0.101-1.092 0.101c-0.728 0-1.231-0.139-1.509-0.417s-0.417-0.58-0.417-0.905c0-0.383 0.029-0.757 0.086-1.121s0.134-0.767 0.23-1.207l1.955-8.911-1.782-0.402zM3.876 3.177c0-0.652 0.22-1.159 0.661-1.523s0.996-0.546 1.667-0.546c0.728 0 1.308 0.182 1.739 0.546s0.647 0.872 0.647 1.523c0 0.613-0.216 1.102-0.647 1.466s-1.011 0.546-1.739 0.546c-0.671 0-1.226-0.182-1.667-0.546s-0.661-0.853-0.661-1.466v0z" />
          </symbol>
          <symbol id="icon-layers" viewBox="0 0 26 24">
            <title>layers</title>
            <path d="M20.712 13.123l2.732 1.877-10.917 7.5-10.917-7.5 2.73-1.876 8.187 5.626 8.185-5.627zM23.441 9l-10.915 7.5-10.92-7.5 10.92-7.5 10.915 7.5z" />
          </symbol>
          <symbol id="icon-metadata" viewBox="0 0 36 24">
            <title>metadata</title>
            <path d="M15.525 5.4h14.85v3.3h-14.85v-3.3zM15.525 15.3h11.55v3.3h-11.55v-3.3zM8.925 10.35c-1.823 0-3.3-1.477-3.3-3.3s1.477-3.3 3.3-3.3c1.823 0 3.3 1.477 3.3 3.3s-1.477 3.3-3.3 3.3zM8.925 20.25c-1.823 0-3.3-1.477-3.3-3.3s1.477-3.3 3.3-3.3c1.823 0 3.3 1.477 3.3 3.3s-1.477 3.3-3.3 3.3z" />
          </symbol>
          <symbol id="icon-widgets" viewBox="0 0 28 24">
            <title>widgets</title>
            <path d="M5.597 17.25v-10.5h4.5v10.5h-4.5zM11.597 17.25v-7.5h4.5v7.5h-4.5zM17.597 17.25v-15h4.5v15h-4.5zM2.597 21.75v-3h22.5v3h-22.5z" />
          </symbol>
          <symbol id="icon-check" viewBox="0 0 24 24">
            <title>check</title>
            <path d="M21 5q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-12 12q-0.289 0.289-0.711 0.289t-0.711-0.289l-6-6q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l5.289 5.297 11.289-11.297q0.289-0.289 0.711-0.289z" />
          </symbol>
          <symbol id="icon-cross" viewBox="0 0 24 24">
            <title>cross</title>
            <path d="M19 4q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-6.297 6.289 6.297 6.289q0.289 0.289 0.289 0.711 0 0.43-0.285 0.715t-0.715 0.285q-0.422 0-0.711-0.289l-6.289-6.297-6.289 6.297q-0.289 0.289-0.711 0.289-0.43 0-0.715-0.285t-0.285-0.715q0-0.422 0.289-0.711l6.297-6.289-6.297-6.289q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l6.289 6.297 6.289-6.297q0.289-0.289 0.711-0.289z" />
          </symbol>
          <symbol id="icon-drag-dots" viewBox="0 0 14 24">
            <title>drag-dots</title>
            <path d="M2.4 9.6c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4z" />
            <path d="M12 9.6c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4z" />
            <path d="M2.4 0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4z" />
            <path d="M12 0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4z" />
            <path d="M2.4 19.2c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4z" />
            <path d="M12 19.2c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4z" />
          </symbol>
          <symbol id="icon-twitter" viewBox="0 0 25 24">
            <title>twitter</title>
            <path d="M19.835 6.545c0.793-0.595 1.388-1.388 1.785-2.182-0.794 0.397-1.587 0.793-2.579 0.992-0.793-0.992-1.785-1.388-2.975-1.388-2.182 0-3.967 1.785-3.967 3.967 0 0.397 0 0.595 0.198 0.991-3.57-0.198-6.545-1.785-8.529-4.165-0.397 0.595-0.595 1.19-0.595 1.984 0 1.388 0.793 2.579 1.785 3.372-0.595 0-1.19-0.198-1.785-0.595 0 0 0 0 0 0 0 1.984 1.388 3.57 3.173 3.967-0.198 0.198-0.595 0.397-0.992 0.397-0.198 0-0.595 0-0.793 0 0.595 1.587 1.984 2.777 3.769 2.777-1.388 0.991-2.975 1.587-4.959 1.587-0.397 0-0.595 0-0.991 0 1.785 1.19 3.967 1.785 6.148 1.785 7.537 0 11.504-6.149 11.504-11.504 0-0.198 0-0.397 0-0.595 0.794-0.595 1.388-1.388 1.984-2.182-0.595 0.397-1.388 0.595-2.182 0.794z" />
          </symbol>
          <symbol id="icon-facebook" viewBox="0 0 25 24">
            <title>facebook</title>
            <path d="M16.616 8.514h-2.987v-1.992c0-0.664 0.332-0.996 0.664-0.996h1.992v-3.32l-2.656-0.332c-3.32 0-3.983 2.656-3.983 4.315v2.324h-1.992v3.652h1.992v9.959h3.983v-9.959h2.656l0.332-3.652z" />
          </symbol>
          <symbol id="icon-linkedin" viewBox="0 0 24 24">
            <title>linkedin</title>
            <path d="M9 6.75h4.151v2.128h0.059c0.578-1.036 1.991-2.128 4.098-2.128 4.381 0 5.192 2.728 5.192 6.275v7.225h-4.327v-6.405c0-1.528-0.032-3.493-2.251-3.493-2.254 0-2.597 1.663-2.597 3.382v6.516h-4.325v-13.5z" />
            <path d="M1.5 6.75h4.5v13.5h-4.5v-13.5z" />
            <path d="M6 3c0 1.243-1.007 2.25-2.25 2.25s-2.25-1.007-2.25-2.25c0-1.243 1.007-2.25 2.25-2.25s2.25 1.007 2.25 2.25z" />
          </symbol>
          <symbol id="icon-cog" viewBox="0 0 24 24">
            <title>cog</title>
            <path d="M21.886 14.303c-1.259-2.181-0.502-4.976 1.691-6.246l-2.359-4.085c-0.674 0.395-1.457 0.622-2.294 0.622-2.521 0-4.564-2.056-4.564-4.594h-4.717c0.006 0.783-0.189 1.577-0.608 2.302-1.259 2.181-4.058 2.923-6.254 1.658l-2.358 4.085c0.679 0.386 1.267 0.951 1.684 1.676 1.257 2.177 0.504 4.967-1.681 6.239l2.359 4.085c0.671-0.391 1.451-0.615 2.283-0.615 2.513 0 4.55 2.044 4.563 4.569h4.717c-0.002-0.776 0.194-1.56 0.608-2.279 1.257-2.177 4.049-2.921 6.244-1.664l2.359-4.085c-0.674-0.386-1.259-0.95-1.674-1.669zM12 16.859c-2.683 0-4.859-2.176-4.859-4.859s2.176-4.859 4.859-4.859c2.683 0 4.859 2.176 4.859 4.859s-2.176 4.859-4.859 4.859z" />
          </symbol>
          <symbol id="icon-search" viewBox="0 0 24 24">
            <title>search</title>
            <path d="M22.628 20l-4.343-4.457c1.028-1.6 1.715-3.543 1.715-5.486 0-5.486-4.457-10.058-9.943-10.058s-10.057 4.457-10.057 10.058 4.457 10.057 9.943 10.057c2.057 0 3.886-0.572 5.486-1.715l4.342 4.343c0.343 0.343 1.028 0.343 1.372 0l1.372-1.372c0.457-0.343 0.457-1.028 0.114-1.372zM9.943 18.057c-4.343 0-8-3.657-8-8s3.543-8 8-8 8 3.657 8 8-3.543 8-8 8z" />
          </symbol>
          <symbol id="icon-info2" viewBox="0 0 10 24">
            <title>info2</title>
            <path d="M7.902 8.104l-2.943 10.561c-0.173 0.52-0.173 1.039-0.173 1.212s0 0.173 0.173 0.346c0 0.173 0.173 0.173 0.347 0.173s0.346 0 0.52-0.173c0.52-0.346 1.039-1.039 1.558-2.078l0.52 0.346c-1.732 2.424-3.29 3.809-5.021 3.809-0.692 0-1.212-0.173-1.558-0.52s-0.52-0.866-0.52-1.385c0-0.346 0-0.865 0.173-1.385l2.078-7.099c0.346-0.866 0.346-1.385 0.346-1.732 0-0.173-0.173-0.346-0.346-0.52s-0.347-0.173-0.692-0.173c-0.173 0-0.347 0-0.52 0l0.173-0.52z" />
            <path d="M8.594 5.507c-0.346 0.346-0.865 0.692-1.558 0.692-0.52 0-1.039-0.173-1.558-0.692-0.346-0.52-0.52-1.039-0.52-1.558s0.173-1.039 0.692-1.558c0.346-0.347 0.865-0.692 1.558-0.692s1.212 0.173 1.558 0.692c0.347 0.347 0.52 0.866 0.52 1.558 0 0.52-0.173 1.039-0.692 1.558z" />
          </symbol>
          <symbol id="icon-share" viewBox="0 0 24 24">
            <title>share</title>
            <path d="M12.941 14.158v4.868l7.966-7.966-7.966-7.967v4.868c-3.541 0.11-9.958 1.66-9.958 9.959v2.877l1.438-2.434c1.881-3.098 3.762-4.094 8.52-4.204z" />
          </symbol>
          <symbol id="icon-logo" viewBox="0 0 146 24">
            <title>logo</title>
            <path d="M38.193 11.711c0.347-0.465 0.521-1.030 0.521-1.694 0-0.549-0.096-1.008-0.286-1.375-0.192-0.368-0.449-0.659-0.774-0.877s-0.702-0.385-1.133-0.478-0.887-0.152-1.367-0.152h-3.517v9.456h2.077v-3.841h0.894l1.974 3.841h2.495l-2.401-3.985c0.667-0.124 1.174-0.431 1.52-0.896v0zM36.386 10.602c-0.111 0.142-0.251 0.245-0.42 0.312s-0.358 0.068-0.567 0.081-0.407-0.018-0.593-0.018h-1.094v-2.069h1.228c0.187 0 0.378 0.017 0.573 0.043s0.369 0.080 0.52 0.155c0.151 0.076 0.275 0.184 0.373 0.326s0.146 0.332 0.146 0.572c0 0.257-0.056 0.457-0.167 0.598zM42.018 12.751h4.153v-2.068h-4.153v-1.478h4.153v-2.069h-6.23v9.456h6.527v-2.068h-4.45v-1.773zM52.805 11.611c-0.325-0.195-0.674-0.346-1.047-0.451s-0.723-0.212-1.047-0.319c-0.325-0.107-0.594-0.234-0.807-0.386s-0.32-0.367-0.32-0.651c0-0.177 0.044-0.328 0.133-0.451s0.205-0.224 0.346-0.299c0.142-0.075 0.293-0.13 0.454-0.166s0.316-0.053 0.467-0.053c0.258 0 0.531 0.051 0.82 0.152s0.518 0.259 0.687 0.472l1.427-1.554c-0.4-0.354-0.849-0.607-1.347-0.757s-1.014-0.226-1.547-0.226c-0.462 0-0.911 0.064-1.347 0.193s-0.82 0.321-1.154 0.577c-0.334 0.257-0.601 0.576-0.8 0.957s-0.3 0.823-0.3 1.328c0 0.523 0.109 0.943 0.327 1.262s0.491 0.576 0.821 0.771c0.329 0.195 0.685 0.349 1.067 0.465s0.738 0.23 1.066 0.346 0.602 0.255 0.82 0.418c0.218 0.164 0.327 0.388 0.327 0.67 0 0.169-0.043 0.315-0.127 0.439s-0.196 0.226-0.334 0.305-0.294 0.14-0.467 0.179c-0.173 0.040-0.345 0.060-0.514 0.060-0.346 0-0.682-0.077-1.007-0.232s-0.594-0.373-0.807-0.657l-1.48 1.621c0.453 0.416 0.942 0.718 1.467 0.904s1.094 0.279 1.707 0.279c0.488 0 0.954-0.062 1.394-0.186s0.827-0.314 1.16-0.571 0.598-0.58 0.794-0.971c0.196-0.39 0.293-0.846 0.293-1.368 0-0.549-0.106-0.988-0.32-1.316s-0.482-0.589-0.807-0.784zM63.362 8.257c-0.453-0.43-0.992-0.76-1.614-0.99s-1.303-0.346-2.041-0.346c-0.738 0-1.418 0.116-2.041 0.346s-1.16 0.56-1.614 0.99-0.807 0.95-1.060 1.562c-0.253 0.611-0.38 1.293-0.38 2.046s0.127 1.435 0.38 2.046c0.253 0.611 0.607 1.132 1.060 1.561s0.992 0.76 1.614 0.99c0.623 0.23 1.303 0.346 2.041 0.346s1.418-0.116 2.041-0.346c0.623-0.23 1.16-0.56 1.614-0.99s0.807-0.95 1.061-1.561c0.253-0.611 0.38-1.293 0.38-2.046s-0.127-1.435-0.38-2.046c-0.253-0.611-0.607-1.132-1.061-1.562zM62.435 13.080c-0.138 0.367-0.336 0.686-0.594 0.956s-0.567 0.481-0.927 0.631c-0.36 0.151-0.763 0.226-1.207 0.226s-0.847-0.075-1.207-0.226-0.669-0.361-0.927-0.631c-0.258-0.27-0.456-0.589-0.593-0.956s-0.207-0.773-0.207-1.216c0-0.433 0.069-0.837 0.207-1.209s0.335-0.693 0.593-0.963c0.258-0.27 0.567-0.48 0.927-0.632s0.763-0.226 1.207-0.226c0.445 0 0.847 0.075 1.207 0.226s0.669 0.361 0.927 0.632c0.258 0.271 0.456 0.591 0.594 0.963s0.207 0.775 0.207 1.209c0 0.443-0.069 0.848-0.207 1.216zM71.686 12.86c0 0.293-0.020 0.563-0.113 0.811s-0.212 0.463-0.38 0.644c-0.169 0.182-0.362 0.323-0.594 0.425s-0.482 0.153-0.757 0.153c-0.275 0-0.53-0.051-0.766-0.153s-0.437-0.244-0.606-0.425c-0.169-0.182-0.354-0.396-0.447-0.644s-0.193-0.518-0.193-0.811v-5.725h-2.077v5.804c0 0.558 0.136 1.072 0.305 1.541s0.446 0.877 0.78 1.222 0.762 0.616 1.26 0.81c0.498 0.195 1.082 0.293 1.741 0.293 0.649 0 1.226-0.098 1.724-0.293s0.915-0.465 1.249-0.81c0.334-0.346 0.557-0.753 0.726-1.222s0.226-0.983 0.226-1.541v-5.804h-2.077v5.725zM82.076 11.711c0.347-0.465 0.52-1.030 0.52-1.694 0-0.549-0.096-1.008-0.287-1.375-0.192-0.368-0.449-0.659-0.774-0.877s-0.702-0.385-1.133-0.478-0.887-0.152-1.367-0.152h-3.788v9.456h2.077v-3.841h1.165l1.974 3.841h2.494l-2.401-3.985c0.667-0.124 1.174-0.431 1.521-0.896zM80.269 10.602c-0.111 0.142-0.251 0.245-0.42 0.312s-0.358 0.068-0.567 0.081-0.407-0.018-0.594-0.018h-1.365v-2.069h1.498c0.187 0 0.378 0.017 0.573 0.043s0.37 0.080 0.521 0.155c0.151 0.076 0.275 0.184 0.373 0.326s0.146 0.332 0.146 0.572c0 0.257-0.056 0.457-0.166 0.598zM89.119 14.627c-0.329 0.178-0.707 0.266-1.133 0.266-0.374 0-0.723-0.075-1.047-0.226s-0.607-0.361-0.847-0.631c-0.24-0.27-0.429-0.589-0.567-0.956s-0.207-0.773-0.207-1.216c0-0.434 0.069-0.837 0.207-1.209s0.329-0.693 0.574-0.963c0.244-0.27 0.533-0.48 0.867-0.632s0.696-0.226 1.087-0.226 0.736 0.066 1.034 0.199c0.298 0.133 0.549 0.323 0.754 0.572l1.601-1.302c-0.205-0.256-0.436-0.474-0.694-0.651s-0.526-0.319-0.807-0.425c-0.28-0.106-0.565-0.184-0.854-0.232s-0.567-0.073-0.834-0.073c-0.738 0-1.418 0.115-2.041 0.346s-1.16 0.56-1.614 0.99-0.807 0.95-1.061 1.562c-0.253 0.61-0.38 1.293-0.38 2.046s0.127 1.435 0.38 2.046c0.254 0.611 0.607 1.132 1.061 1.562s0.992 0.76 1.614 0.99c0.623 0.23 1.303 0.346 2.041 0.346 0.649 0 1.28-0.133 1.894-0.398s1.121-0.677 1.521-1.236l-1.734-1.289c-0.214 0.319-0.484 0.567-0.814 0.744zM94.53 12.751h4.154v-2.068h-4.154v-1.478h4.451v-2.069h-6.527v9.456h6.824v-2.068h-4.747v-1.773zM111.674 7.136l-2.347 8.274h-0.027l-2.388-8.274h-1.121l-2.387 8.274h-0.027l-2.347-8.274h-0.907l2.747 9.456h1.081l2.388-8.274h0.027l2.388 8.274h1.080l2.748-9.456h-0.907zM116.476 7.136l-4.122 9.456h0.92l1.067-2.659h5.002l1.027 2.659h0.987l-3.975-9.456h-0.907zM114.689 13.342l2.201-5.155 2.135 5.155h-4.335zM121.231 8.023h3.263v8.57h0.89v-8.57h3.263v-0.887h-7.417v0.887zM136.123 15.206c-0.222 0.181-0.456 0.332-0.7 0.451s-0.496 0.209-0.754 0.265c-0.258 0.058-0.507 0.086-0.747 0.086-0.614 0-1.167-0.106-1.66-0.319s-0.913-0.505-1.26-0.877c-0.346-0.372-0.614-0.81-0.801-1.316s-0.28-1.049-0.28-1.634 0.094-1.13 0.28-1.634c0.187-0.505 0.454-0.944 0.801-1.316s0.767-0.664 1.26-0.877c0.493-0.212 1.047-0.319 1.66-0.319 0.48 0 0.949 0.102 1.408 0.305 0.458 0.204 0.833 0.527 1.127 0.97l0.72-0.598c-0.418-0.531-0.905-0.91-1.46-1.136s-1.154-0.338-1.794-0.338c-0.72 0-1.381 0.124-1.981 0.372s-1.114 0.591-1.541 1.030c-0.427 0.439-0.76 0.959-1 1.562s-0.36 1.262-0.36 1.979c0 0.717 0.12 1.38 0.36 1.986s0.574 1.13 1 1.568c0.427 0.438 0.94 0.779 1.541 1.023s1.261 0.365 1.981 0.365c0.694 0 1.338-0.133 1.934-0.398s1.121-0.704 1.574-1.316l-0.72-0.544c-0.169 0.257-0.365 0.476-0.587 0.658zM144.966 7.136v4.137h-5.34v-4.137h-0.89v9.456h0.89v-4.432h5.34v4.432h0.89v-9.456h-0.89z" />
            <path d="M7.722 4.323l-7.722 7.692 5.451 5.43 7.723-7.692-5.452-5.43z" />
            <path d="M14.288 8.54l3.121-3.108-5.348-5.328-3.121 3.108 5.348 5.328z" />
            <path d="M16.273 19.788l7.723-7.692-5.451-5.43-7.723 7.692 5.451 5.43z" />
            <path d="M9.707 15.57l-3.12 3.108 5.349 5.328 3.12-3.108-5.349-5.328z" />
          </symbol>
          <symbol id="icon-hash" viewBox="0 0 21 24">
            <title>hash</title>
            <path d="M19.688 9.375v-2.625h-3.284l0.656-5.25h-2.625l-0.656 5.25h-5.249l0.656-5.25h-2.625l-0.656 5.25h-4.592v2.625h4.264l-0.655 5.25h-3.609v2.625h3.281l-0.656 5.25h2.625l0.656-5.25h5.249l-0.656 5.25h2.626l0.656-5.25h4.594v-2.625h-4.266l0.654-5.25h3.612zM12.796 14.625h-5.249l0.655-5.25h5.249l-0.655 5.25z" />
          </symbol>
          <symbol id="icon-type" viewBox="0 0 24 24">
            <title>type</title>
            <path d="M19.875 1.5h-15.75c-0.362 0-0.656 0.294-0.656 0.656v3.938c0 0.362 0.294 0.656 0.656 0.656h0.656c0.362 0 0.656-0.294 0.656-0.656l1.313-1.969h3.938v15.75l-3.281 1.313c-0.362 0-0.656 0.293-0.656 0.656s0.294 0.656 0.656 0.656h9.188c0.363 0 0.656-0.293 0.656-0.656s-0.293-0.656-0.656-0.656l-3.281-1.313v-15.75h3.938l1.313 1.969c0 0.362 0.293 0.656 0.656 0.656h0.656c0.363 0 0.656-0.294 0.656-0.656v-3.938c0-0.362-0.293-0.656-0.656-0.656z" />
          </symbol>
          <symbol id="icon-minus" viewBox="0 0 24 24">
            <title>minus</title>
            <path d="M4.125 13.432h15.67v-2.864h-15.67z" />
          </symbol>
          <symbol id="icon-plus" viewBox="0 0 24 24">
            <title>plus</title>
            <path d="M9.962 1.5v8.4h-8.462v4.2h8.462v8.4h4.076v-8.4h8.462v-4.2h-8.462v-8.4z" />
          </symbol>
          <symbol id="icon-filter" viewBox="0 0 24 24">
            <title>filter</title>
            <path d="M12 1.5c-5.799 0-10.5 1.469-10.5 3.281v1.969l7.875 7.875v6.563c0 0.725 1.175 1.313 2.625 1.313s2.625-0.588 2.625-1.313v-6.563l7.875-7.875v-1.969c0-1.812-4.701-3.281-10.5-3.281zM3.436 4.347c0.491-0.28 1.181-0.546 1.995-0.769 1.804-0.494 4.137-0.766 6.569-0.766s4.766 0.272 6.569 0.766c0.814 0.223 1.504 0.489 1.995 0.769 0.324 0.185 0.499 0.341 0.58 0.434-0.081 0.093-0.256 0.25-0.58 0.434-0.491 0.28-1.181 0.546-1.995 0.769-1.804 0.494-4.137 0.766-6.569 0.766s-4.766-0.272-6.569-0.766c-0.814-0.223-1.504-0.489-1.995-0.769-0.324-0.185-0.499-0.341-0.58-0.434 0.082-0.093 0.256-0.25 0.58-0.434z" />
          </symbol>
          <symbol id="icon-star-empty" viewBox="0 0 24 24">
            <title>star-empty</title>
            <path d="M24 9.306l-8.292-1.205-3.708-7.514-3.708 7.514-8.292 1.205 6 5.849-1.416 8.258 7.416-3.899 7.416 3.899-1.416-8.258 6-5.849zM12 17.66l-5.237 2.753 1-5.832-4.237-4.13 5.856-0.851 2.619-5.306 2.619 5.306 5.856 0.851-4.237 4.13 1 5.832-5.237-2.753z" />
          </symbol>
          <symbol id="icon-star-full" viewBox="0 0 24 24">
            <title>star-full</title>
            <path d="M24 9.306l-8.292-1.205-3.708-7.514-3.708 7.514-8.292 1.205 6 5.849-1.416 8.258 7.416-3.899 7.416 3.899-1.416-8.258 6-5.849z" />
          </symbol>
        </defs>
      </svg>
    );
  }
}
