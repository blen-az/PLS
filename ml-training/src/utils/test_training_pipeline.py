def test_full_pipeline():
    from train import main
    main()
    # Verify files exist
    assert os.path.exists('models/v1/keras_model')
    assert os.path.exists('models/v1/scaler.pkl')