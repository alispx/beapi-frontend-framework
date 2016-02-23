<?php $class = ''; ?>
<?php include 'header.php'; ?>
	
	<section class="content" id="content">
		
		<?php include 'blocks/breadcrumb.php'; ?>

		
		
		<article class="entry" itemscope itemtype="http://schema.org/Article">
			<header class="entry__header">
				<h1 class="page__title" itemprop="headline">Titre de la page</h1>
				<div class="entry__date">
					Publié le <time datetime="2015-06-30" itemprop="datePublished">06/30/2015</time>
				</div>
			</header>
			<div class="row ">
				<div class="small-12 large-4 columns">
					<div>
						<h2>1ere colonne</h2>
						<p>Voici la premiere colonne</p>
					</div>
					
				</div>
		        <div class="small-6 large-4 columns">
		        	<div>
						<h2>2eme colonne</h2>
						<p>Voici la deuxieme colonne</p>
					</div>
		        </div>
		        <div class="small-6 large-4 columns">
		        	<div>
						<h2>3eme colonne</h2>
						<p>Voici la troisieme colonne</p>
					</div>
		        </div>
			</div>
			<br />
			<h3>Grilles knacss</h3>
			<div class="grid-4-tablet-3-small-2-tiny-1">
				<div >
					1- lorem ipsum<br>Lorem Elsass ipsum lacus leverwurscht Wurschtsalad mamsell Gal.
				</div>
				<div>
					2- lorem ipsum<br>Lorem Elsass ipsum lacus leverwurscht Wurschtsalad mamsell Gal.
				</div>
				<div>
					3- lorem ipsum<br>Lorem Elsass ipsum lacus leverwurscht Wurschtsalad mamsell Gal.
				</div>
				<div>
					4- lorem ipsum<br>Lorem Elsass ipsum lacus leverwurscht Wurschtsalad mamsell Gal.
				</div>
			</div>
			<br />
			<h3>Grilles Personnal Gutter Size (hack)</h3>
			<div class="grid-sass">
				<div>1 sur 7</div>
				<div>2 sur 7</div>
				<div>3 sur 7</div>
				<div>4 sur 7</div>
				<div>5 sur 7</div>
				<div>6 sur 7</div>
				<div>7 sur 7</div>
			</div>
			<br />
			<div class="grid-sass-6">
				<div>1 sur 6</div>
				<div>2 sur 6</div>
				<div>3 sur 6</div>
				<div>4 sur 6</div>
				<div>5 sur 6</div>
				<div>6 sur 6</div>
			</div>
			<br />
			<div class="grid-sass-3">
				<div>1 sur 3</div>
				<div>2 sur 3</div>
				<div>3 sur 3</div>
			</div>
			<br />
			<div class="grid-uneven">
				<div >1/6</div>
				<div >5/6</div>
			</div>
			<br />
			<div class="grid-2-1">
			  <div>
			    <ul class="unstyled grid-3">
			        <li>1</li>
			        <li>2</li>
			        <li>3</li>
			    </ul>
			  </div>
			  <aside>
			    2- lorem ipsum Hopla choucroute !
			  </aside>
			</div>
		</article>
	</section>

	<aside class="sidebar" id="sidebar">
		<div class="widget-area">
			<?php include 'blocks/widgets/widget-search.php'; ?>
			<?php include 'blocks/widgets/widget-text.php'; ?>
			<?php include 'blocks/widgets/widget-categories.php'; ?>
			<?php include 'blocks/widgets/widget-archive.php'; ?>
			<?php include 'blocks/widgets/widget-pages.php'; ?>
			<?php include 'blocks/widgets/widget-gravityform.php'; ?>
		</div>
	</aside>
<?php include 'footer.php'; ?>